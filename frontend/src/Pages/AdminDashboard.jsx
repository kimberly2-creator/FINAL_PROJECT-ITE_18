import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const pickupLocations = [
  "Laurente Bldg, Butuan City",
  "Robinsons Place Butuan",
  "SM City Butuan",
  "Bancasi Airport", 
  "CSU unahan lang"
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vehicleCount, setVehicleCount] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "booking",
      message: "New booking: Toyota Camry by Ms. Pitao",
      time: "2 minutes ago",
      color: "green",
      isNew: false
    },
    {
      id: 2,
      type: "return",
      message: "Vehicle returned: Honda Civic 2010",
      time: "15 minutes ago",
      color: "blue",
      isNew: false
    },
    {
      id: 3,
      type: "registration",
      message: "New customer registration: Mikyla Agan",
      time: "1 hour ago",
      color: "orange",
      isNew: false
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received: ₱5,500 for Booking #4",
      time: "2 hours ago",
      color: "yellow",
      isNew: false
    }
  ])

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    seats: 5,
    transmission: "Manual",
    fuelType: "Gasoline",
    status: "Available",
    imageFile: null,
    imagePreview: null
  })

  // Add demo activity animation on mount
  useEffect(() => {
    // Show a new activity after dashboard loads for demo
    const demoTimer = setTimeout(() => {
      const demoActivity = {
        id: Date.now(),
        type: "booking",
        message: "New booking: Ford Ranger by Ben Dover",
        time: "Just now",
        color: "green",
        isNew: true
      }
      setRecentActivities(prev => [demoActivity, ...prev.slice(0, 3)])
    }, 2500)

    return () => clearTimeout(demoTimer)
  }, [])

  useEffect(() => {
    // Check admin authentication
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!isAdminLoggedIn) {
      navigate("/admin/login")
      return
    }
    
    // Load vehicle counts
    const loadCounts = () => {
      const savedVehicles = localStorage.getItem("adminVehicles")
      if (savedVehicles) {
        const vehicles = JSON.parse(savedVehicles)
        setVehicleCount(vehicles.length)
        setAvailableCount(vehicles.filter(v => v.status === "Available").length)
      } else {
        setVehicleCount(3) // Default count from initial data
        setAvailableCount(2)
      }
    }

    loadCounts()
    
    // Load mock dashboard data
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Listen for vehicle updates
    const handleStorageChange = () => {
      loadCounts()
    }
    
    // Listen for new bookings from ExploreCars
    const handleNewBooking = (event) => {
      if (event.key === 'newBooking') {
        const bookingData = JSON.parse(event.newValue)
        const newActivity = {
          id: Date.now(),
          type: "booking",
          message: `New booking: ${bookingData.car.make} ${bookingData.car.model} by ${bookingData.customerName || 'Customer'}`,
          time: "Just now",
          color: "green",
          isNew: true
        }
        setRecentActivities(prev => [newActivity, ...prev.slice(0, 3)])
        
        // Remove the new booking flag after 3 seconds
        setTimeout(() => {
          setRecentActivities(prev => 
            prev.map(activity => 
              activity.id === newActivity.id 
                ? { ...activity, isNew: false } 
                : activity
            )
          )
        }, 3000)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('storage', handleNewBooking)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage', handleNewBooking)
    }
  }, [navigate])

  const handleLogout = async () => {
    try {
      // Clear admin session
      localStorage.removeItem("adminLoggedIn")
      localStorage.removeItem("adminUsername")
      console.log("Admin logged out successfully")
      navigate("/admin/login")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Car, label: "Manage Vehicles", path: "/admin/vehicles" },
    { icon: Calendar, label: "Reservations", path: "/admin/reservations" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  ]

  const getActivityIcon = (color) => {
    switch(color) {
      case 'green': return 'bg-green-400'
      case 'blue': return 'bg-blue-400'
      case 'orange': return 'bg-[#FF6B35]'
      case 'yellow': return 'bg-yellow-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#111111] border border-[#222222] lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111111] border-r border-[#222222] transform transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button
            variant="ghost"
            className="w-full flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all duration-200 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="p-8">
          {loading ? (
            <div className="text-center text-gray-400 relative z-50 bg-[#0A0A0A] min-h-screen flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mb-4"></div>
                <p>Loading dashboard...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <>
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Maayong Adlaw! Admin</h1>
                <p className="text-gray-400">Here's what's happening with BNB Car Rental today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#111111] rounded-xl border border-[#222222] p-6">
                  <h3 className="text-gray-400 mb-2">Total Vehicles</h3>
                  <p className="text-3xl font-bold text-[#FF6B35]">{vehicleCount}</p>
                  <p className="text-sm text-green-400 mt-2">{availableCount} available</p>
                </div>
                <div className="bg-[#111111] rounded-xl border border-[#222222] p-6">
                  <h3 className="text-gray-400 mb-2">Active Bookings</h3>
                  <p className="text-3xl font-bold text-[#FF6B35]">9</p>
                  <p className="text-sm text-green-400 mt-2">+5 today</p>
                </div>
                <div className="bg-[#111111] rounded-xl border border-[#222222] p-6">
                  <h3 className="text-gray-400 mb-2">Total Customers</h3>
                  <p className="text-3xl font-bold text-[#FF6B35]">23</p>
                  <p className="text-sm text-green-400 mt-2">+12 this week</p>
                </div>
                <div className="bg-[#111111] rounded-xl border border-[#222222] p-6">
                  <h3 className="text-gray-400 mb-2">Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-[#FF6B35]">₱54,500</p>
                  <p className="text-sm text-green-400 mt-2">+15% vs last month</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-[#111111] rounded-xl border border-[#222222] p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id}
                      className={`flex items-center justify-between py-3 border-b border-[#222222] last:border-b-0 transition-all duration-500 ${
                        activity.isNew 
                          ? 'animate-slideInNew bg-[#1A1A1A] rounded-lg px-4 py-4 border border-green-400/30' 
                          : 'hover:bg-[#1A1A1A] rounded-lg px-2'
                      }`}
                      style={{
                        animationDelay: activity.isNew ? '0ms' : `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 ${getActivityIcon(activity.color)} rounded-full ${activity.isNew ? 'animate-pulse' : ''}`}></div>
                        <span className={activity.isNew ? 'font-semibold text-white' : ''}>{activity.message}</span>
                        {activity.isNew && (
                          <span className="text-xs bg-green-400 text-black px-2 py-1 rounded-full font-bold animate-pulse">NEW</span>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <style>{`
        @keyframes slideInNew {
          0% { 
            opacity: 0; 
            transform: translateX(-20px) scale(0.95); 
            background: rgba(34, 197, 94, 0.1);
          }
          50% {
            background: rgba(34, 197, 94, 0.2);
            transform: translateX(5px) scale(1.02);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
            background: rgba(26, 26, 26, 1);
          }
        }
        .animate-slideInNew { animation: slideInNew 0.6s cubic-bezier(.4,2,.6,1); }
      `}</style>
    </div>
  )
}

export default AdminDashboard 