import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BookOpen, Users, Clock, Shield } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Digital Library Management",
      description: "Comprehensive system for managing book collections, issuing, and tracking returns with real-time availability updates."
    },
    {
      icon: Users,
      title: "Student & Admin Access",
      description: "Separate portals for students to browse and track their books, and for administrators to manage the entire library system."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor due dates, overdue books, and availability status. Get instant updates on book returns and new acquisitions."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with modern security practices and reliable data management to ensure your library operations run smoothly."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Our Library Management System</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern, efficient, and user-friendly library management system designed to streamline 
            library operations and enhance the reading experience for students and staff.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-16">
          <div className="aspect-[16/9] overflow-hidden rounded-lg max-w-4xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746309556362-eeb46c991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg0NTAzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern Library Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                To provide an intuitive, comprehensive library management solution that empowers 
                educational institutions to efficiently manage their book collections, streamline 
                borrowing processes, and create a seamless experience for both librarians and students. 
                We believe that access to knowledge should be simple, organized, and accessible to all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">System Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-lg font-semibold mb-1">Unlimited Books</div>
                <div className="text-sm text-muted-foreground">Manage extensive book collections</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-lg font-semibold mb-1">Unlimited Users</div>
                <div className="text-sm text-muted-foreground">Support for all students and staff</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-lg font-semibold mb-1">Always Available</div>
                <div className="text-sm text-muted-foreground">Access your library anytime</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Built with Modern Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold mb-1">React</div>
                  <div className="text-sm text-muted-foreground">Frontend Framework</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold mb-1">TypeScript</div>
                  <div className="text-sm text-muted-foreground">Type Safety</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold mb-1">Tailwind CSS</div>
                  <div className="text-sm text-muted-foreground">Modern Styling</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold mb-1">Local Storage</div>
                  <div className="text-sm text-muted-foreground">Data Persistence</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of educational institutions using our library management system 
                to streamline their operations and improve student experience.
              </p>
              <div className="space-x-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  Free to Use
                </span>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  Easy Setup
                </span>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg">
                  24/7 Support
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}