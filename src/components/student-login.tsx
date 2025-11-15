"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useLibrary } from '../context/library-context'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { toast } from 'sonner@2.0.3'

interface StudentLoginProps {
  onPageChange: (page: string) => void
}

export function StudentLogin({ onPageChange }: StudentLoginProps) {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerRollNo, setRegisterRollNo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const { loginStudent, registerStudent, students } = useLibrary()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const student = students.find((s) => s.username === loginUsername && s.password === loginPassword)

    if (student) {
      loginStudent(student)
      toast.success(`Login successful - Welcome back, ${student.name}!`)
      onPageChange('dashboard')
    } else {
      toast.error("Invalid credentials - Please check your username and password")
    }
    setIsLoading(false)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (students.some((s) => s.username === registerUsername)) {
      toast.error("Registration failed - Username already exists")
      setIsLoading(false)
      return
    }

    if (students.some((s) => s.rollNo === registerRollNo)) {
      toast.error("Registration failed - Roll number already exists")
      setIsLoading(false)
      return
    }

    const newStudent = {
      id: `student-${Date.now()}`,
      name: registerName,
      username: registerUsername,
      password: registerPassword,
      rollNo: registerRollNo,
    }

    registerStudent(newStudent)
    toast.success("Registration successful - You can now login with your credentials")

    // Reset form and switch to login tab
    setRegisterName("")
    setRegisterUsername("")
    setRegisterPassword("")
    setRegisterRollNo("")
    setIsLoading(false)

    // Set the login fields to the registered values for convenience
    setLoginUsername(registerUsername)
    setLoginPassword(registerPassword)

    // Switch to login tab
    setActiveTab("login")
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
            <CardTitle className="text-2xl font-bold">Student Portal</CardTitle>
            <CardDescription>Login or register to access the library</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      placeholder="Enter your username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      placeholder="Enter your full name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      placeholder="Choose a username"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Choose a password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-roll">Roll Number</Label>
                    <Input
                      id="register-roll"
                      placeholder="Enter your roll number"
                      value={registerRollNo}
                      onChange={(e) => setRegisterRollNo(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            {students.length > 0 ? `${students.length} students registered` : "No students registered yet"}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}