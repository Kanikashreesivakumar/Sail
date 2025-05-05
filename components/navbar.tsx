"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar({ isLoggedIn, isAdmin, onNavigate, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (page) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 relative">
              <Image src="/sail-logo.png" alt="SAIL Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="ml-3">
              <span className="text-[#002060] font-bold text-lg">Guest House Management</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick("home")}
              className="px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
            >
              Home
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => handleNavClick("login")}
                className="px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => handleNavClick(isAdmin ? "admin" : "employee")}
                className="px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Dashboard
              </button>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => handleNavClick("adminLogin")}
                className="px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Admin
              </button>
            )}

            <button
              onClick={() => handleNavClick("about")}
              className="px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
            >
              About
            </button>

            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-[#002060] text-white rounded-md hover:bg-[#003090] transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#002060] hover:bg-blue-50 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavClick("home")}
              className="block w-full text-left px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
            >
              Home
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => handleNavClick("login")}
                className="block w-full text-left px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => handleNavClick(isAdmin ? "admin" : "employee")}
                className="block w-full text-left px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Dashboard
              </button>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => handleNavClick("adminLogin")}
                className="block w-full text-left px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
              >
                Admin
              </button>
            )}

            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left px-3 py-2 text-[#002060] hover:bg-blue-50 rounded-md transition-colors"
            >
              About
            </button>

            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 bg-[#002060] text-white rounded-md hover:bg-[#003090] transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
