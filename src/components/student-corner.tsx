import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { PenTool, Heart, Star, Calendar } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function StudentCorner() {
  const creations = [
    {
      type: "Poem",
      title: "The Silent Library",
      author: "Sarah Mitchell",
      date: "2024-01-15",
      category: "Poetry",
      excerpt: "In halls where whispers float on air, And knowledge dwells in every chair...",
      likes: 24
    },
    {
      type: "Story",
      title: "The Mysterious Book",
      author: "Alex Chen",
      date: "2024-01-10",
      category: "Fiction",
      excerpt: "Emma discovered an old book that seemed to glow in the moonlight...",
      likes: 18
    },
    {
      type: "Essay",
      title: "The Impact of Digital Libraries",
      author: "Jordan Williams",
      date: "2024-01-08",
      category: "Academic",
      excerpt: "As we transition into the digital age, libraries must evolve...",
      likes: 15
    },
    {
      type: "Poem",
      title: "Autumn Leaves and Old Pages",
      author: "Maya Patel",
      date: "2024-01-05",
      category: "Poetry",
      excerpt: "Golden leaves fall like pages from a book, Each one telling its story...",
      likes: 31
    },
    {
      type: "Story",
      title: "The Librarian's Secret",
      author: "David Kim",
      date: "2024-01-03",
      category: "Mystery",
      excerpt: "Mrs. Henderson had been the librarian for forty years, but no one knew...",
      likes: 22
    },
    {
      type: "Review",
      title: "Review: 'The Midnight Library' by Matt Haig",
      author: "Emily Rodriguez",
      date: "2024-01-01",
      category: "Book Review",
      excerpt: "This philosophical novel takes readers on a journey through infinite possibilities...",
      likes: 19
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'poem':
        return PenTool
      case 'story':
        return PenTool
      case 'essay':
        return PenTool
      default:
        return PenTool
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'poem':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'story':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'essay':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'review':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Student Corner</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A creative space for students to share their poems, stories, essays, and other literary works. 
            Express yourself and inspire others through the power of words.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="aspect-[16/9] overflow-hidden rounded-lg max-w-4xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1733671805619-1a1563c006bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHJlYWRpbmclMjBjb3JuZXJ8ZW58MXx8fHwxNzU4NDUwMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students reading in a cozy corner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Featured Creation</span>
                  </CardTitle>
                  <CardDescription>Highlighted work from our talented students</CardDescription>
                </div>
                <Badge className={getTypeColor(creations[0].type)}>{creations[0].type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-2">{creations[0].title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span>By {creations[0].author}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(creations[0].date).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span>{creations[0].likes} likes</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {creations[0].excerpt}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Creations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.slice(1).map((creation, index) => {
              const Icon = getTypeIcon(creation.type)
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getTypeColor(creation.type)}>{creation.type}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>{creation.likes}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{creation.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2 text-sm">
                        <span>By {creation.author}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(creation.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {creation.excerpt}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <PenTool className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <div className="font-semibold">Poetry</div>
                <div className="text-sm text-muted-foreground">12 works</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <PenTool className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="font-semibold">Short Stories</div>
                <div className="text-sm text-muted-foreground">8 works</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <PenTool className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <div className="font-semibold">Essays</div>
                <div className="text-sm text-muted-foreground">15 works</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <PenTool className="h-8 w-8 mx-auto mb-3 text-orange-600" />
                <div className="font-semibold">Reviews</div>
                <div className="text-sm text-muted-foreground">6 works</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Share Your Creativity</h3>
              <p className="text-muted-foreground mb-6">
                Have a poem, story, or essay you'd like to share? Contact your library administrator 
                to submit your work and inspire fellow students with your creativity.
              </p>
              <div className="space-x-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  Submit Your Work
                </span>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  Get Featured
                </span>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  Inspire Others
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}