import React, { useState } from 'react'
import { LibraryProvider } from './context/library-context'
import { Navigation } from './components/navigation'
import { HomePage } from './components/home-page'
import { AdminLogin } from './components/admin-login'
import { StudentLogin } from './components/student-login'
import { Dashboard } from './components/dashboard'
import { SearchPage } from './components/search-page'
import { AboutPage } from './components/about-page'
import { ContactPage } from './components/contact-page'
import { StudentCorner } from './components/student-corner'
import { FloatingActionButton } from './components/floating-action-button'
import { Toaster } from './components/ui/sonner'

type Page = 'home' | 'about' | 'admin-login' | 'student-login' | 'dashboard' | 'search' | 'contact' | 'student-corner'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />
      case 'about':
        return <AboutPage />
      case 'admin-login':
        return <AdminLogin onPageChange={setCurrentPage} />
      case 'student-login':
        return <StudentLogin onPageChange={setCurrentPage} />
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />
      case 'search':
        return <SearchPage />
      case 'contact':
        return <ContactPage />
      case 'student-corner':
        return <StudentCorner />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <FloatingActionButton onPageChange={setCurrentPage} currentPage={currentPage} />
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <LibraryProvider>
      <AppContent />
    </LibraryProvider>
  )
}