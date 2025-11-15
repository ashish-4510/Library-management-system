"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useLibrary } from '../context/library-context'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface AdminLoginProps {
  onPageChange: (page: string) => void
}

export function AdminLogin({ onPageChange }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { loginAdmin } = useLibrary()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check admin credentials
    if (username === "admin" && password === "123") {
      loginAdmin()
      toast.success("Login successful - Welcome back, Admin!")
      onPageChange('dashboard')
    } else {
      toast.error("Invalid credentials - Please check your username and password")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center relative">
            <button 
              onClick={() => onPageChange('home')}
              className="absolute left-4 top-4 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Default admin credentials: admin / 123
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}