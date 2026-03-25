import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, UserPlus, Eye, EyeOff, IdCard, Cloud, Sun, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Real-time info component
const RealTimeInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState({
    temp: 28,
    condition: 'sunny',
    location: 'Butuan City'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Mock weather data for Butuan City - in real app, you'd fetch from weather API
    const mockWeatherData = [
      { temp: 28, condition: 'sunny', location: 'Butuan City' },
      { temp: 26, condition: 'partly-cloudy', location: 'Butuan City' },
      { temp: 30, condition: 'cloudy', location: 'Butuan City' }
    ]
    
    setWeather(mockWeatherData[0])

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-400" />
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-300" />
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-400" />
      default: return <Cloud className="w-8 h-8 text-gray-300" />
    }
  }

  return (
    <div className="absolute top-6 left-6 text-white z-20">
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <span className="text-2xl font-light">{weather.temp}°</span>
          </div>
          <div className="border-l border-white/20 pl-4">
            <div className="text-sm text-white/80">{weather.location}</div>
            <div className="text-lg font-medium">{formatTime(currentTime)}</div>
          </div>
        </div>
        <div className="text-sm text-white/70 mt-2">{formatDate(currentTime)}</div>
      </div>
    </div>
  )
}

// Real city background component with blur animation (no zooming)
const CityBackground = () => (
  <div className="fixed inset-0 z-0">
    {/* Real city image background with blur animation */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-blur-fade"
      style={{
        backgroundImage: `url('/flatiron-building.jpg')`,
      }}
    />
    
    {/* Animated white overlay that fades with the blur */}
    <div 
      className="absolute inset-0 animate-white-fade"
    />
  </div>
)

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseFile, setLicenseFile] = useState(null)
  const [licensePreview, setLicensePreview] = useState(null)
  const [idFile, setIdFile] = useState(null)
  const [idPreview, setIdPreview] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLicenseFile = (e) => {
    const file = e.target.files[0]
    setLicenseFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setLicensePreview(ev.target.result)
      reader.readAsDataURL(file)
    } else {
      setLicensePreview(null)
    }
  }

  const handleIdFile = (e) => {
    const file = e.target.files[0]
    setIdFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setIdPreview(ev.target.result)
      reader.readAsDataURL(file)
    } else {
      setIdPreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validation
      if (!name || !email || !password || !licenseNumber || !licenseFile || !idFile) {
        setError("Please fill all fields and upload required documents")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return
      }

      // Mock registration - simulate account creation
      console.log("Registration successful for:", {
        name,
        email,
        licenseNumber,
        hasLicense: !!licenseFile,
        hasId: !!idFile
      })

      // Store login state after successful registration
      localStorage.setItem("mockLoggedIn", "true")
      localStorage.setItem("mockUsername", name)
      localStorage.setItem("mockEmail", email)
      
      // Trigger storage event to update navbar
      window.dispatchEvent(new Event("storage"))
      
      navigate("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-8 relative overflow-hidden">
      <CityBackground />
      <RealTimeInfo />
      
      <div className="w-full max-w-md skeuo-card p-8 shadow-xl rounded-3xl flex flex-col items-center relative z-10 bg-white/90 backdrop-blur-md border border-white/20">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
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
          <span className="text-2xl font-extrabold text-black tracking-wide ">BNB</span>
          <span className="text-2xl font-extrabold text-[#FF6B35] tracking-wide">Car Rental</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an Account</h2>
        <p className="text-gray-600 mb-8 text-center">Join us and start your journey with BNB Car Rental</p>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
            <Input 
              id="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name" 
              className="py-6 bg-white/95 backdrop-blur-sm border-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="pl-10 py-6 bg-white/95 backdrop-blur-sm border-white/30"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="pl-10 py-6 bg-white/95 backdrop-blur-sm border-white/30"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="licenseNumber" className="block text-gray-700 font-medium flex items-center gap-2">
              <IdCard className="w-5 h-5 text-gray-400" /> Driver's License Number
            </label>
            <Input 
              id="licenseNumber" 
              type="text" 
              value={licenseNumber} 
              onChange={e => setLicenseNumber(e.target.value)} 
              placeholder="Enter your license number" 
              className="py-6 bg-white/95 backdrop-blur-sm border-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <IdCard className="w-5 h-5 text-gray-400" /> Upload Driver's License Photo
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLicenseFile} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fff7f2]/95 file:text-[#FF6B35] hover:file:bg-[#ffe3d1]/95 file:backdrop-blur-sm"
              required
            />
            {licensePreview && <img src={licensePreview} alt="License Preview" className="mt-2 rounded-lg shadow w-full max-h-32 object-contain" />}
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <IdCard className="w-5 h-5 text-gray-400" /> Upload Government-issued ID
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleIdFile} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fff7f2]/95 file:text-[#FF6B35] hover:file:bg-[#ffe3d1]/95 file:backdrop-blur-sm"
              required
            />
            {idPreview && <img src={idPreview} alt="ID Preview" className="mt-2 rounded-lg shadow w-full max-h-32 object-contain" />}
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-6 h-auto font-bold text-lg rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
            disabled={loading}
          >
            <UserPlus className="mr-2 h-5 w-5" /> {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FF6B35] hover:text-[#FF5722] font-medium">
            Sign in
          </Link>
        </p>
        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blur-fade {
          0%, 100% { 
            filter: blur(8px);
          }
          50% { 
            filter: blur(3px);
          }
        }
        
        @keyframes white-fade {
          0%, 100% { 
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.25), transparent);
          }
          50% { 
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
          }
        }
        
        .animate-blur-fade {
          animation: blur-fade 15s ease-in-out infinite;
        }
        
        .animate-white-fade {
          animation: white-fade 15s ease-in-out infinite;
        }
        
        .skeuo-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
        }
      `}</style>
    </div>
  )
}

export default Register