import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useLibrary } from '../context/library-context'
import { BookOpen, Users, Plus, Edit, Trash2, Calendar, CheckCircle, XCircle, Clock, AlertCircle, Search } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface DashboardProps {
  onPageChange?: (page: string) => void
}

export function Dashboard({ onPageChange }: DashboardProps = {}) {
  const { 
    currentUser, 
    isAdmin, 
    books, 
    students, 
    issuedBooks, 
    addBook, 
    updateBook, 
    deleteBook, 
    issueBook, 
    returnBook 
  } = useLibrary()

  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isEditBookOpen, setIsEditBookOpen] = useState(false)
  const [isIssueBookOpen, setIsIssueBookOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState("")

  // Form states
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    totalCopies: 1,
    publishedYear: new Date().getFullYear()
  })

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    addBook({
      ...bookForm,
      availableCopies: bookForm.totalCopies
    })
    setIsAddBookOpen(false)
    setBookForm({
      title: '',
      author: '',
      isbn: '',
      category: '',
      totalCopies: 1,
      publishedYear: new Date().getFullYear()
    })
    toast.success("Book added successfully!")
  }

  const handleEditBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedBook) {
      const availableDiff = bookForm.totalCopies - selectedBook.totalCopies
      updateBook(selectedBook.id, {
        ...bookForm,
        availableCopies: Math.max(0, selectedBook.availableCopies + availableDiff)
      })
      setIsEditBookOpen(false)
      setSelectedBook(null)
      toast.success("Book updated successfully!")
    }
  }

  const handleDeleteBook = (bookId: string) => {
    deleteBook(bookId)
    toast.success("Book deleted successfully!")
  }

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedBook && selectedStudent) {
      if (selectedBook.availableCopies > 0) {
        issueBook(selectedBook.id, selectedStudent)
        setIsIssueBookOpen(false)
        setSelectedBook(null)
        setSelectedStudent("")
        toast.success("Book issued successfully!")
      } else {
        toast.error("No copies available for this book!")
      }
    }
  }

  const handleReturnBook = (issuedBookId: string) => {
    returnBook(issuedBookId)
    toast.success("Book returned successfully!")
  }

  const openEditDialog = (book: any) => {
    setSelectedBook(book)
    setBookForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      totalCopies: book.totalCopies,
      publishedYear: book.publishedYear
    })
    setIsEditBookOpen(true)
  }

  const openIssueDialog = (book: any) => {
    setSelectedBook(book)
    setIsIssueBookOpen(true)
  }

  // Get user-specific issued books
  const userIssuedBooks = currentUser 
    ? issuedBooks.filter(issued => issued.studentId === currentUser.id && issued.status !== 'returned')
    : []

  const userIssuedBooksWithDetails = userIssuedBooks.map(issued => {
    const book = books.find(b => b.id === issued.bookId)
    return { ...issued, book }
  })

  // Get all issued books with details for admin
  const allIssuedBooksWithDetails = issuedBooks.map(issued => {
    const book = books.find(b => b.id === issued.bookId)
    const student = students.find(s => s.id === issued.studentId)
    return { ...issued, book, student }
  })

  // Statistics
  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0)
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0)
  const issuedBooksCount = issuedBooks.filter(issued => issued.status === 'issued').length
  const overdueBooks = issuedBooks.filter(issued => 
    issued.status === 'issued' && new Date(issued.dueDate) < new Date()
  ).length

  if (isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
              <p className="text-xs text-muted-foreground">
                {books.length} unique titles
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Books</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableBooks}</div>
              <p className="text-xs text-muted-foreground">
                Ready to be issued
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issued Books</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{issuedBooksCount}</div>
              <p className="text-xs text-muted-foreground">
                Currently borrowed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="books" className="space-y-4">
          <TabsList>
            <TabsTrigger value="books">Books Management</TabsTrigger>
            <TabsTrigger value="issued">Issued Books</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Books Collection</h2>
              <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddBook}>
                    <DialogHeader>
                      <DialogTitle>Add New Book</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new book to add to the library.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                          id="title"
                          value={bookForm.title}
                          onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">Author</Label>
                        <Input
                          id="author"
                          value={bookForm.author}
                          onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isbn" className="text-right">ISBN</Label>
                        <Input
                          id="isbn"
                          value={bookForm.isbn}
                          onChange={(e) => setBookForm({...bookForm, isbn: e.target.value})}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input
                          id="category"
                          value={bookForm.category}
                          onChange={(e) => setBookForm({...bookForm, category: e.target.value})}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="copies" className="text-right">Total Copies</Label>
                        <Input
                          id="copies"
                          type="number"
                          min="1"
                          value={bookForm.totalCopies}
                          onChange={(e) => setBookForm({...bookForm, totalCopies: parseInt(e.target.value)})}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">Published Year</Label>
                        <Input
                          id="year"
                          type="number"
                          value={bookForm.publishedYear}
                          onChange={(e) => setBookForm({...bookForm, publishedYear: parseInt(e.target.value)})}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Book</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available/Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={book.availableCopies > 0 ? "default" : "destructive"}>
                          {book.availableCopies}/{book.totalCopies}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openIssueDialog(book)}
                            disabled={book.availableCopies === 0}
                          >
                            Issue
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(book)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="issued" className="space-y-4">
            <h2 className="text-2xl font-bold">Issued Books</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allIssuedBooksWithDetails.map((issued) => (
                    <TableRow key={issued.id}>
                      <TableCell className="font-medium">{issued.book?.title}</TableCell>
                      <TableCell>{issued.student?.name}</TableCell>
                      <TableCell>{issued.student?.rollNo}</TableCell>
                      <TableCell>{new Date(issued.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(issued.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            issued.status === 'returned' ? 'default' :
                            new Date(issued.dueDate) < new Date() ? 'destructive' : 'secondary'
                          }
                        >
                          {issued.status === 'returned' ? 'Returned' :
                           new Date(issued.dueDate) < new Date() ? 'Overdue' : 'Issued'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {issued.status !== 'returned' && (
                          <Button
                            size="sm"
                            onClick={() => handleReturnBook(issued.id)}
                          >
                            Mark Returned
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <h2 className="text-2xl font-bold">Registered Students</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Books Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const studentIssuedCount = issuedBooks.filter(
                      issued => issued.studentId === student.id && issued.status === 'issued'
                    ).length
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.username}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{studentIssuedCount}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Book Dialog */}
        <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
          <DialogContent>
            <form onSubmit={handleEditBook}>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>
                  Update the details of the selected book.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">Title</Label>
                  <Input
                    id="edit-title"
                    value={bookForm.title}
                    onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-author" className="text-right">Author</Label>
                  <Input
                    id="edit-author"
                    value={bookForm.author}
                    onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-isbn" className="text-right">ISBN</Label>
                  <Input
                    id="edit-isbn"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({...bookForm, isbn: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">Category</Label>
                  <Input
                    id="edit-category"
                    value={bookForm.category}
                    onChange={(e) => setBookForm({...bookForm, category: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-copies" className="text-right">Total Copies</Label>
                  <Input
                    id="edit-copies"
                    type="number"
                    min="1"
                    value={bookForm.totalCopies}
                    onChange={(e) => setBookForm({...bookForm, totalCopies: parseInt(e.target.value)})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-year" className="text-right">Published Year</Label>
                  <Input
                    id="edit-year"
                    type="number"
                    value={bookForm.publishedYear}
                    onChange={(e) => setBookForm({...bookForm, publishedYear: parseInt(e.target.value)})}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Issue Book Dialog */}
        <Dialog open={isIssueBookOpen} onOpenChange={setIsIssueBookOpen}>
          <DialogContent>
            <form onSubmit={handleIssueBook}>
              <DialogHeader>
                <DialogTitle>Issue Book</DialogTitle>
                <DialogDescription>
                  Select a student to issue "{selectedBook?.title}" to.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student-select" className="text-right">Student</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.rollNo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Issue Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Student Dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
              <p className="text-muted-foreground">Manage your borrowed books and discover new ones</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Badge variant="outline" className="text-center">
                Roll No: {currentUser?.rollNo}
              </Badge>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{userIssuedBooks.length}</div>
                <div className="text-xs sm:text-sm text-blue-600/70 dark:text-blue-400/70">Books Borrowed</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                  {userIssuedBooks.filter(issued => new Date(issued.dueDate) < new Date()).length}
                </div>
                <div className="text-xs sm:text-sm text-red-600/70 dark:text-red-400/70">Overdue</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {books.reduce((sum, book) => sum + book.availableCopies, 0)}
                </div>
                <div className="text-xs sm:text-sm text-green-600/70 dark:text-green-400/70">Available</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{books.length}</div>
                <div className="text-xs sm:text-sm text-purple-600/70 dark:text-purple-400/70">Total Books</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Books Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Borrowed Books
              </CardTitle>
              <CardDescription>Books currently in your possession</CardDescription>
            </CardHeader>
            <CardContent>
              {userIssuedBooksWithDetails.length > 0 ? (
                <div className="space-y-4">
                  {/* Mobile-friendly book cards */}
                  <div className="grid gap-4">
                    {userIssuedBooksWithDetails.map((issued) => {
                      const isOverdue = new Date(issued.dueDate) < new Date()
                      const daysUntilDue = Math.ceil((new Date(issued.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                      
                      return (
                        <Card key={issued.id} className={`border-l-4 ${isOverdue ? 'border-l-red-500' : daysUntilDue <= 3 ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              {/* Book Cover */}
                              <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center shrink-0">
                                <BookOpen className="h-6 w-6 text-primary/50" />
                              </div>
                              
                              {/* Book Details */}
                              <div className="flex-1 space-y-2">
                                <div>
                                  <h3 className="font-semibold line-clamp-1">{issued.book?.title}</h3>
                                  <p className="text-sm text-muted-foreground">{issued.book?.author}</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">{issued.book?.category}</Badge>
                                  <Badge 
                                    variant={isOverdue ? 'destructive' : daysUntilDue <= 3 ? 'secondary' : 'default'}
                                    className="text-xs"
                                  >
                                    {isOverdue ? (
                                      <>
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Overdue by {Math.abs(daysUntilDue)} days
                                      </>
                                    ) : daysUntilDue <= 3 ? (
                                      <>
                                        <Clock className="h-3 w-3 mr-1" />
                                        Due in {daysUntilDue} days
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {daysUntilDue} days left
                                      </>
                                    )}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                  <div>
                                    <span>Issued: </span>
                                    <span className="font-medium">{new Date(issued.issueDate).toLocaleDateString()}</span>
                                  </div>
                                  <div>
                                    <span>Due: </span>
                                    <span className="font-medium">{new Date(issued.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Action Button */}
                              <div className="sm:w-auto w-full">
                                <Button 
                                  variant={isOverdue ? "destructive" : "outline"}
                                  size="sm"
                                  className="w-full sm:w-auto"
                                  disabled
                                >
                                  {isOverdue ? "Return Required" : "Return to Library"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books borrowed yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our collection and borrow your first book!
                  </p>
                  <Button onClick={() => onPageChange('search')} className="gap-2">
                    <Search className="h-4 w-4" />
                    Browse Books
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reading History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Reading History
              </CardTitle>
              <CardDescription>Books you've returned</CardDescription>
            </CardHeader>
            <CardContent>
              {issuedBooks.filter(issued => issued.studentId === currentUser?.id && issued.status === 'returned').length > 0 ? (
                <div className="space-y-3">
                  {issuedBooks
                    .filter(issued => issued.studentId === currentUser?.id && issued.status === 'returned')
                    .slice(0, 5)
                    .map((issued) => {
                      const book = books.find(b => b.id === issued.bookId)
                      return (
                        <div key={issued.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-10 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center shrink-0">
                            <BookOpen className="h-4 w-4 text-primary/50" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium line-clamp-1">{book?.title}</h4>
                            <p className="text-sm text-muted-foreground">{book?.author}</p>
                          </div>
                          <div className="text-xs text-muted-foreground text-right shrink-0">
                            Returned<br />
                            {issued.returnDate ? new Date(issued.returnDate).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      )
                    })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No reading history yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}