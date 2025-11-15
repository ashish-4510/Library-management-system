"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Student {
  id: string
  name: string
  username: string
  password: string
  rollNo: string
}

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  availableCopies: number
  totalCopies: number
  publishedYear: number
}

export interface IssuedBook {
  id: string
  bookId: string
  studentId: string
  issueDate: string
  dueDate: string
  returnDate?: string
  status: 'issued' | 'returned' | 'overdue'
}

interface LibraryContextType {
  // Auth state
  currentUser: Student | null
  isAdmin: boolean
  
  // Data
  students: Student[]
  books: Book[]
  issuedBooks: IssuedBook[]
  
  // Auth actions
  loginStudent: (student: Student) => void
  loginAdmin: () => void
  logout: () => void
  registerStudent: (student: Student) => void
  
  // Book actions
  addBook: (book: Omit<Book, 'id'>) => void
  updateBook: (id: string, book: Partial<Book>) => void
  deleteBook: (id: string) => void
  
  // Issue/Return actions
  issueBook: (bookId: string, studentId: string) => void
  returnBook: (issuedBookId: string) => void
  
  // Search
  searchBooks: (query: string) => Book[]
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined)

// Sample data
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    availableCopies: 3,
    totalCopies: 5,
    publishedYear: 1960
  },
  {
    id: '2',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    category: 'Computer Science',
    availableCopies: 2,
    totalCopies: 3,
    publishedYear: 2009
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    availableCopies: 4,
    totalCopies: 6,
    publishedYear: 1925
  },
  {
    id: '4',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '978-1-285-74155-0',
    category: 'Mathematics',
    availableCopies: 1,
    totalCopies: 4,
    publishedYear: 2015
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    category: 'Fiction',
    availableCopies: 2,
    totalCopies: 3,
    publishedYear: 1813
  }
]

const initialStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    rollNo: 'CS2021001'
  },
  {
    id: 'student-2',
    name: 'Jane Smith',
    username: 'janesmith',
    password: 'password123',
    rollNo: 'CS2021002'
  }
]

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Student | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('library-user')
    const savedIsAdmin = localStorage.getItem('library-is-admin')
    const savedStudents = localStorage.getItem('library-students')
    const savedBooks = localStorage.getItem('library-books')
    const savedIssuedBooks = localStorage.getItem('library-issued-books')

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    if (savedIsAdmin) {
      setIsAdmin(JSON.parse(savedIsAdmin))
    }
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }
    if (savedIssuedBooks) {
      setIssuedBooks(JSON.parse(savedIssuedBooks))
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('library-user', JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem('library-is-admin', JSON.stringify(isAdmin))
  }, [isAdmin])

  useEffect(() => {
    localStorage.setItem('library-students', JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem('library-books', JSON.stringify(books))
  }, [books])

  useEffect(() => {
    localStorage.setItem('library-issued-books', JSON.stringify(issuedBooks))
  }, [issuedBooks])

  const loginStudent = (student: Student) => {
    setCurrentUser(student)
    setIsAdmin(false)
  }

  const loginAdmin = () => {
    setCurrentUser(null)
    setIsAdmin(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAdmin(false)
  }

  const registerStudent = (student: Student) => {
    setStudents(prev => [...prev, student])
  }

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: `book-${Date.now()}`
    }
    setBooks(prev => [...prev, newBook])
  }

  const updateBook = (id: string, bookData: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...bookData } : book
    ))
  }

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  const issueBook = (bookId: string, studentId: string) => {
    const issueDate = new Date()
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 14) // 2 weeks loan period

    const newIssuedBook: IssuedBook = {
      id: `issued-${Date.now()}`,
      bookId,
      studentId,
      issueDate: issueDate.toISOString(),
      dueDate: dueDate.toISOString(),
      status: 'issued'
    }

    setIssuedBooks(prev => [...prev, newIssuedBook])
    
    // Decrease available copies
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, availableCopies: Math.max(0, book.availableCopies - 1) }
        : book
    ))
  }

  const returnBook = (issuedBookId: string) => {
    const returnDate = new Date().toISOString()
    
    setIssuedBooks(prev => prev.map(issuedBook => {
      if (issuedBook.id === issuedBookId) {
        // Increase available copies
        setBooks(prevBooks => prevBooks.map(book => 
          book.id === issuedBook.bookId 
            ? { ...book, availableCopies: book.availableCopies + 1 }
            : book
        ))
        
        return {
          ...issuedBook,
          returnDate,
          status: 'returned' as const
        }
      }
      return issuedBook
    }))
  }

  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books
    
    const searchTerm = query.toLowerCase()
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(searchTerm)
    )
  }

  const value: LibraryContextType = {
    currentUser,
    isAdmin,
    students,
    books,
    issuedBooks,
    loginStudent,
    loginAdmin,
    logout,
    registerStudent,
    addBook,
    updateBook,
    deleteBook,
    issueBook,
    returnBook,
    searchBooks
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider')
  }
  return context
}