import React from 'react'
import { Button } from './ui/button'
import { Search, Plus, BookOpen } from 'lucide-react'
import { useLibrary } from '../context/library-context'

interface FloatingActionButtonProps {
  onPageChange: (page: string) => void
  currentPage: string
}

export function FloatingActionButton({ onPageChange, currentPage }: FloatingActionButtonProps) {
  const { currentUser, isAdmin } = useLibrary()

  // Don't show on certain pages
  if (currentPage === 'admin-login' || currentPage === 'student-login') {
    return null
  }

  const handleClick = () => {
    if (currentPage === 'search') {
      // If already on search page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onPageChange('search')
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        onClick={handleClick}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        {currentPage === 'search' ? (
          <BookOpen className="h-6 w-6" />
        ) : (
          <Search className="h-6 w-6" />
        )}
      </Button>
    </div>
  )
}