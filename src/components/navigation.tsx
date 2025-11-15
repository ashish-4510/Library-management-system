import React, { useState } from 'react'
import { Button } from './ui/button'
import { useLibrary } from '../context/library-context'
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu, BookOpen, LogOut, User, Home, Info, Users, Search } from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { currentUser, isAdmin, logout } = useLibrary()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handlePageChange = (page: string) => {
    onPageChange(page)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    onPageChange('home')
    setIsMobileMenuOpen(false)
  }

  const isAuthenticated = currentUser || isAdmin

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handlePageChange('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <BookOpen className="h-8 w-8" />
              <span className="text-lg font-semibold hidden sm:block">Library Management System</span>
              <span className="text-lg font-semibold sm:hidden">LMS</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <button
                    onClick={() => handlePageChange('home')}
                    className={`px-3 py-2 rounded-md hover:bg-primary/80 transition-colors ${
                      currentPage === 'home' ? 'bg-primary/60' : ''
                    }`}
                  >
                    Home
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => handlePageChange('about')}
                    className={`px-3 py-2 rounded-md hover:bg-primary/80 transition-colors ${
                      currentPage === 'about' ? 'bg-primary/60' : ''
                    }`}
                  >
                    About
                  </button>
                </NavigationMenuItem>

                {!isAuthenticated && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/80">
                      Registration
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 space-y-2 min-w-[200px]">
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => handlePageChange('student-login')}
                            className="block w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            Student Registration
                          </button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => handlePageChange('admin-login')}
                            className="block w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            Admin Login
                          </button>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <button
                    onClick={() => handlePageChange('search')}
                    className={`px-3 py-2 rounded-md hover:bg-primary/80 transition-colors ${
                      currentPage === 'search' ? 'bg-primary/60' : ''
                    }`}
                  >
                    Search Books
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => handlePageChange('dashboard')}
                  variant="secondary"
                  size="sm"
                  className={`${currentPage === 'dashboard' ? 'bg-secondary/80' : ''} gap-2`}
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-32 truncate">
                    {isAdmin ? 'Admin Panel' : currentUser?.name}
                  </span>
                </Button>
                <Button onClick={handleLogout} variant="destructive" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handlePageChange('student-login')}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  Student
                </Button>
                <Button
                  onClick={() => handlePageChange('admin-login')}
                  variant="outline"
                  size="sm"
                  className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2"
                >
                  <Users className="h-4 w-4" />
                  Admin
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => handlePageChange('home')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors ${
                      currentPage === 'home' ? 'bg-accent' : ''
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('about')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors ${
                      currentPage === 'about' ? 'bg-accent' : ''
                    }`}
                  >
                    <Info className="h-4 w-4" />
                    <span>About</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('search')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors ${
                      currentPage === 'search' ? 'bg-accent' : ''
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Search Books</span>
                  </button>

                  {!isAuthenticated && (
                    <>
                      <hr className="my-4" />
                      <button
                        onClick={() => handlePageChange('student-login')}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <Users className="h-4 w-4" />
                        <span>Student Login</span>
                      </button>
                      <button
                        onClick={() => handlePageChange('admin-login')}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Admin Login</span>
                      </button>
                    </>
                  )}

                  {isAuthenticated && (
                    <>
                      <hr className="my-4" />
                      <button
                        onClick={() => handlePageChange('dashboard')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors ${
                          currentPage === 'dashboard' ? 'bg-accent' : ''
                        }`}
                      >
                        <User className="h-4 w-4" />
                        <span>{isAdmin ? 'Admin Dashboard' : 'My Dashboard'}</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}