"use client"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock function to get user data
const getMockUser = () => {
  if (localStorage.getItem("mockLoggedIn") === "true") {
    return {
      name: localStorage.getItem("mockUsername") || "User",
      email: "user@bnb.com"
    }
  }
  return null
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(getMockUser())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleStorage = () => setUser(getMockUser())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("mockLoggedIn")
    localStorage.removeItem("mockUsername")
    setUser(null)
    navigate("/")
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/models", label: "Explore Cars" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-[#FF6B35]"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-black tracking-wide group-hover:text-[#FF6B35] transition-colors">BNB</span>
            <span className="text-2xl font-extrabold text-[#FF6B35] tracking-wide">Car Rental</span>
          </Link>

          {/* Right side container for navigation and auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-all duration-300 hover:text-[#FF6B35] ${
                    location.pathname === link.to 
                      ? "text-[#FF6B35] bg-[#fff7f2] px-3 py-2 rounded-lg" 
                      : "text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fff7f2] text-[#FF6B35] font-semibold hover:bg-orange-100 transition-colors">
                    <User className="w-5 h-5" />
                    {user.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity z-50">
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 hover:bg-[#fff7f2] text-gray-700">
                      <User className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/dashboard?tab=reservations" className="flex items-center gap-2 px-4 py-3 hover:bg-[#fff7f2] text-gray-700">
                      <LogIn className="w-4 h-4" /> My Reservations
                    </Link>
                    <Link to="/dashboard?tab=profile" className="flex items-center gap-2 px-4 py-3 hover:bg-[#fff7f2] text-gray-700">
                      <UserPlus className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-[#fff7f2] text-red-500">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold px-5 py-2 rounded-lg shadow transition-transform duration-300 hover:scale-105 flex items-center gap-2">
                      <LogIn className="w-5 h-5 text-white" /> Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-white border border-[#FF6B35] text-[#FF6B35] font-bold px-5 py-2 rounded-lg shadow transition-transform duration-300 hover:scale-105 flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-[#FF6B35]" /> Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#FF6B35] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.to 
                      ? "text-[#FF6B35] bg-[#fff7f2]" 
                      : "text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-500">
                      Welcome, {user.name}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-[#FF6B35] text-white text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium border border-[#FF6B35] text-[#FF6B35] text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
