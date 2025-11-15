import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { BookmarkPlus, Clock, AlertCircle, CheckCircle, BookOpen } from 'lucide-react'

interface QuickBookActionsProps {
  book: any
  isIssued: boolean
  currentUser: any
  onBorrow: () => void
  onDetails: () => void
}

export function QuickBookActions({ book, isIssued, currentUser, onBorrow, onDetails }: QuickBookActionsProps) {
  return (
    <Card className="sticky bottom-4 mx-4 md:hidden shadow-lg border-2 border-primary/20 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary/50" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-1 text-sm">{book.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{book.category}</Badge>
              <Badge 
                variant={book.availableCopies > 0 ? "secondary" : "destructive"}
                className="text-xs"
              >
                {book.availableCopies}/{book.totalCopies}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {currentUser ? (
              <Button
                size="sm"
                disabled={book.availableCopies === 0 || isIssued}
                onClick={onBorrow}
                className="text-xs px-3"
              >
                {isIssued ? (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Borrowed
                  </>
                ) : book.availableCopies > 0 ? (
                  <>
                    <BookmarkPlus className="h-3 w-3 mr-1" />
                    Borrow
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    N/A
                  </>
                )}
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled className="text-xs px-3">
                Login to Borrow
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onDetails} className="text-xs px-3">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}