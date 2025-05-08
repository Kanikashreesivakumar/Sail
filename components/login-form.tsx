"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface LoginFormProps {
  onLogin: (data: { employeeId: string }) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [employeeId, setEmployeeId] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!employeeId.trim()) {
      setError("Please enter your Employee ID")
      return
    }

  
    onLogin({ employeeId })
  }

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="employeeId"
              placeholder="Enter your Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="border-gray-300"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-200">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
