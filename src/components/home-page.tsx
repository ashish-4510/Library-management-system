import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { BookOpen, Users, PenTool, Library, Search, User, Clock, AlertCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useLibrary } from '../context/library-context'

interface HomePageProps {
  onPageChange: (page: string) => void
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { currentUser, isAdmin, books, issuedBooks } = useLibrary()
  
  // Get user's current books if they're a student
  const userIssuedBooks = currentUser 
    ? issuedBooks.filter(issued => issued.studentId === currentUser.id && issued.status !== 'returned')
    : []
  const carouselImages = [
    "https://images.unsplash.com/photo-1746309556362-eeb46c991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg0NTAzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1653163520444-4c84b32fa7f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwdGV4dGJvb2tzJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTg0NTAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ]

  const services = [
    {
      title: "Books Issuing",
      description: "Issue books to registered students using roll number from here.",
      icon: BookOpen,
      color: "text-blue-500",
      image: "https://images.unsplash.com/photo-1642980553701-c6b8bb0956ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwaXNzdWluZyUyMGxpYnJhcnklMjBjb3VudGVyfGVufDF8fHx8MTc1ODQ1MDMxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      action: () => onPageChange('dashboard')
    },
    {
      title: "Books Collection",
      description: "Books details according to subjects can be seen from here.",
      icon: Library,
      color: "text-amber-600",
      image: "https://images.unsplash.com/photo-1653163520444-4c84b32fa7f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwdGV4dGJvb2tzJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTg0NTAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      action: () => onPageChange('search')
    },
    {
      title: "Student Corner",
      description: "Show your own creations of poems, stories or any other interest here.",
      icon: PenTool,
      color: "text-red-500",
      image: "https://images.unsplash.com/photo-1733671805619-1a1563c006bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHJlYWRpbmclMjBjb3JuZXJ8ZW58MXx8fHwxNzU4NDUwMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      action: () => onPageChange('student-corner')
    },
    {
      title: "Extra Books",
      description: "Books regarding all other non-additional subjects can be found here.",
      icon: Users,
      color: "text-green-500",
      image: "https://images.unsplash.com/photo-1746309556362-eeb46c991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg0NTAzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      action: () => onPageChange('search')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Library Management System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your gateway to knowledge and learning
          </p>
        </div>

        {/* Quick Access for Authenticated Users */}
        {(currentUser || isAdmin) && (
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {isAdmin ? 'Admin Quick Access' : `Welcome back, ${currentUser?.name}!`}
                </CardTitle>
                <CardDescription>
                  {isAdmin ? 'Manage your library system' : 'Your library dashboard'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => onPageChange('dashboard')} 
                    variant="default"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <User className="h-6 w-6" />
                    <span>My Dashboard</span>
                  </Button>
                  <Button 
                    onClick={() => onPageChange('search')} 
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Search className="h-6 w-6" />
                    <span>Browse Books</span>
                  </Button>
                  {currentUser && (
                    <>
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{userIssuedBooks.length}</div>
                        <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Books Borrowed</div>
                      </div>
                      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
                        <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {userIssuedBooks.filter(issued => new Date(issued.dueDate) < new Date()).length}
                        </div>
                        <div className="text-sm text-orange-600/70 dark:text-orange-400/70">Due Soon</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Carousel Section */}
        <div className="mb-12">
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-lg shadow-lg">
                      <ImageWithFallback
                        src={image}
                        alt={`Library Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" />
            <CarouselNext className="right-2 sm:right-4" />
          </Carousel>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-primary/20">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className={`flex items-center space-x-2 text-base ${service.color}`}>
                      <Icon className="h-5 w-5" />
                      <span>{service.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button onClick={service.action} className="w-full">
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Footer Image and Contact Section */}
        <div className="text-center space-y-6">
          <div className="aspect-[16/6] overflow-hidden rounded-lg max-w-4xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746309556362-eeb46c991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg0NTAzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Library Interior"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-pink-600">Thanks For Visiting</h3>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-green-600">Contact Us</h4>
            <p className="text-muted-foreground max-w-md mx-auto">
              Contact us from here (from the developers of this website).
            </p>
            <Button 
              onClick={() => onPageChange('contact')} 
              size="lg"
              className="mt-4"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}