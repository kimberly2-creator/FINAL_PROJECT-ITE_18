import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const AdminLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Admin credential validation
      if (username === "admin" && password === "admin123") {
        // Store admin login state
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminUsername", username)
        
        console.log("Admin login successful")
        navigate("/admin/dashboard")
      } else {
        setError("Invalid admin credentials. Try: admin / admin123")
      }
    } catch (err) {
      setError("Admin login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f7f7f9] to-[#f0f4fa] px-2 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
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
          <span className="text-2xl font-extrabold text-[#FF6B35] tracking-wide">Admin Panel</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Admin Login</h2>
        
        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Demo Credentials:</h3>
          <div className="text-sm text-orange-700">
            <div><strong>Username:</strong> admin</div>
            <div><strong>Password:</strong> admin123</div>
          </div>
        </div>

        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full rounded-xl border border-gray-200 py-3 px-4 focus:ring-2 focus:ring-[#FF6B35]"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full rounded-xl border border-gray-200 py-3 px-4 focus:ring-2 focus:ring-[#FF6B35]"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button 
            type="submit" 
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold text-lg rounded-xl shadow-md py-4"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin 