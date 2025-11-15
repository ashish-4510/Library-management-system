import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useLibrary } from '../context/library-context'
import { Search, BookOpen, User, Calendar, Heart, Star, BookmarkPlus, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function SearchPage() {
  const { books, currentUser, issuedBooks, issueBook } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("title")

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(books.map(book => book.category))]
    return uniqueCategories.sort()
  }, [books])

  // Filter and sort books based on search query, category, and sort option
  const filteredBooks = useMemo(() => {
    let filtered = books

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(query) ||
        book.category.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(book => book.category === categoryFilter)
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'year':
          return b.publishedYear - a.publishedYear
        case 'availability':
          return b.availableCopies - a.availableCopies
        default:
          return 0
      }
    })

    return filtered
  }, [books, searchQuery, categoryFilter, sortBy])

  const handleRequestBook = () => {
    if (selectedBook && currentUser) {
      if (selectedBook.availableCopies > 0) {
        // Check if user already has this book
        const alreadyIssued = issuedBooks.some(issued => 
          issued.bookId === selectedBook.id && 
          issued.studentId === currentUser.id && 
          issued.status === 'issued'
        )
        
        if (alreadyIssued) {
          toast.error("You already have this book issued!")
          return
        }

        issueBook(selectedBook.id, currentUser.id)
        toast.success(`"${selectedBook.title}" has been successfully borrowed!`)
        setIsRequestDialogOpen(false)
        setSelectedBook(null)
      } else {
        toast.error("This book is currently not available!")
      }
    } else if (!currentUser) {
      toast.error("Please log in to borrow books!")
    }
  }

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    )
  }

  const isBookIssued = (bookId: string) => {
    if (!currentUser) return false
    return issuedBooks.some(issued => 
      issued.bookId === bookId && 
      issued.studentId === currentUser.id && 
      issued.status === 'issued'
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Search Books</h1>

        {/* Search and Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, author, ISBN, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title (A-Z)</SelectItem>
                <SelectItem value="author">Author (A-Z)</SelectItem>
                <SelectItem value="year">Newest First</SelectItem>
                <SelectItem value="availability">Most Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredBooks.length === books.length 
              ? `Showing all ${books.length} books`
              : `Found ${filteredBooks.length} out of ${books.length} books`
            }
            {searchQuery && ` for "${searchQuery}"`}
            {categoryFilter !== "all" && ` in ${categoryFilter}`}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredBooks.map((book) => {
              const isIssued = isBookIssued(book.id)
              const isFavorite = favorites.includes(book.id)
              
              return (
                <Card key={book.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-primary/20">
                  <div className="relative">
                    {/* Book Cover Image Placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <BookOpen className="h-16 w-16 text-primary/30" />
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3">
                        {book.availableCopies > 0 ? (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Not Available
                          </Badge>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                        onClick={() => toggleFavorite(book.id)}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>

                      {/* Issue Status */}
                      {isIssued && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            Borrowed
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-2 leading-tight">{book.title}</CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground shrink-0">
                        <Calendar className="h-3 w-3 mr-1" />
                        {book.publishedYear}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-sm line-clamp-1">{book.author}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{book.category}</Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Copies:</span>
                        <Badge 
                          variant={book.availableCopies > 0 ? "secondary" : "destructive"}
                          className="text-xs px-2"
                        >
                          {book.availableCopies}/{book.totalCopies}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">ISBN:</span> {book.isbn}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      {currentUser ? (
                        <>
                          <Button
                            className="flex-1"
                            disabled={book.availableCopies === 0 || isIssued}
                            onClick={() => {
                              setSelectedBook(book)
                              setIsRequestDialogOpen(true)
                            }}
                          >
                            {isIssued ? (
                              <>
                                <Clock className="h-4 w-4 mr-2" />
                                Borrowed
                              </>
                            ) : book.availableCopies > 0 ? (
                              <>
                                <BookmarkPlus className="h-4 w-4 mr-2" />
                                Borrow
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Unavailable
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="icon" className="shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          Login to Borrow
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter !== "all" 
                ? "Try adjusting your search criteria or filters"
                : "No books available in the library"
              }
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{books.length}</div>
              <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Total Titles</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {books.reduce((sum, book) => sum + book.availableCopies, 0)}
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70">Available Now</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</div>
              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Book Request Dialog */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookmarkPlus className="h-5 w-5" />
                Borrow Book
              </DialogTitle>
              <DialogDescription>
                Confirm that you want to borrow this book
              </DialogDescription>
            </DialogHeader>
            
            {selectedBook && (
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center shrink-0">
                    <BookOpen className="h-8 w-8 text-primary/50" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-medium line-clamp-2">{selectedBook.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{selectedBook.category}</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {selectedBook.availableCopies} available
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Period:</span>
                    <span className="font-medium">14 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-mono text-xs">{selectedBook.isbn}</span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRequestBook} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirm Borrow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}