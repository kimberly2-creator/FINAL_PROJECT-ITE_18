import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Car,
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronDown,
  Filter,
  ArrowLeft,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const pickupLocations = [
  "Laurente Bldg, Butuan City",
  "Robinsons Place Butuan",
  "SM City Butuan",
  "Gaisano Mall Butuan",
  "Butuan City Airport"
]

const AdminVehicles = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [vehicles, setVehicles] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
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
  const [loadingAction, setLoadingAction] = useState(false)

  useEffect(() => {
    // Check admin authentication
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!isAdminLoggedIn) {
      navigate("/admin/login")
      return
    }

    // Load vehicles from localStorage or initialize with mock data
    const savedVehicles = localStorage.getItem("adminVehicles")
    if (savedVehicles) {
      const parsedVehicles = JSON.parse(savedVehicles)
      setVehicles(parsedVehicles)
    } else {
      // Initialize with mock data
      const mockVehicles = [
        {
          id: 1,
          make: "Toyota",
          model: "Camry",
          year: 2023,
          status: "Available",
          price: "₱2,500",
          seats: 5,
          transmission: "Automatic",
          fuelType: "Gasoline"
        },
        {
          id: 2,
          make: "Honda",
          model: "Civic",
          year: 2022,
          status: "Rented",
          price: "₱2,200",
          seats: 5,
          transmission: "Manual",
          fuelType: "Gasoline"
        },
        {
          id: 3,
          make: "Mitsubishi",
          model: "Montero",
          year: 2023,
          status: "Returned",
          price: "₱3,800",
          seats: 7,
          transmission: "Automatic",
          fuelType: "Diesel"
        },
        {
          id: 4,
          make: "Suzuki",
          model: "Ertiga",
          year: 2021,
          status: "Returned",
          price: "₱2,000",
          seats: 7,
          transmission: "Manual",
          fuelType: "Gasoline"
        }
      ]
      setVehicles(mockVehicles)
      localStorage.setItem("adminVehicles", JSON.stringify(mockVehicles))
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [navigate])

  // Filter vehicles based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredVehicles(vehicles)
    } else {
      const filtered = vehicles.filter(vehicle =>
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.year.toString().includes(searchQuery)
      )
      setFilteredVehicles(filtered)
    }
  }, [searchQuery, vehicles])

  const handleAddVehicle = () => {
    setShowAddModal(true)
    setFormData({
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
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: event.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      imageFile: null,
      imagePreview: null
    })
  }

  const getDefaultVehicleImage = (make, model) => {
    const images = {
      'toyota-camry': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop',
      'honda-civic': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
      'ford-ranger': 'https://images.unsplash.com/photo-1558584673-c834fb4d4554?w=500&h=300&fit=crop',
      'mitsubishi-montero': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=300&fit=crop',
      'nissan-navara': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop',
      'suzuki-ertiga': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
    }
    
    const key = `${make.toLowerCase()}-${model.toLowerCase()}`
    return images[key] || 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&h=300&fit=crop'
  }

  const handleSubmitVehicle = (e) => {
    e.preventDefault()
    if (!formData.make || !formData.model || !formData.price) {
      alert("Please fill in all required fields")
      return
    }
    setLoadingAction(true)
    setTimeout(() => {
      const newVehicle = {
        id: Date.now(),
        ...formData,
        price: `₱${formData.price.replace(/[₱,]/g, '')}`,
        imageURL: formData.imagePreview ? formData.imagePreview : getDefaultVehicleImage(formData.make, formData.model)
      }
      delete newVehicle.imageFile
      delete newVehicle.imagePreview
      const updatedVehicles = [...vehicles, newVehicle]
      setVehicles(updatedVehicles)
      localStorage.setItem("adminVehicles", JSON.stringify(updatedVehicles))
      setShowAddModal(false)
      setLoadingAction(false)
      alert("Vehicle added successfully!")
    }, 1000)
  }

  const handleDeleteVehicle = (vehicle) => {
    if (vehicle.status === "Rented") {
      alert("Cannot delete a vehicle that is currently rented. Please wait until it is returned.")
      return
    }
    setSelectedVehicle(vehicle)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setLoadingAction(true)
    setTimeout(() => {
      const updatedVehicles = vehicles.filter(v => v.id !== selectedVehicle.id)
      setVehicles(updatedVehicles)
      localStorage.setItem("adminVehicles", JSON.stringify(updatedVehicles))
      setShowDeleteModal(false)
      setSelectedVehicle(null)
      setLoadingAction(false)
      alert("Vehicle deleted successfully!")
    }, 1000)
  }

  const handleEditVehicle = (id) => {
    // Future implementation - for now just show alert
    alert("Edit functionality iz not abelabol pa - future version. kakappoyyyy")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      {loadingAction && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/dashboard"
              className="p-2 rounded-lg bg-[#111111] border border-[#222222] hover:bg-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Manage Vehicles</h1>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white" onClick={handleAddVehicle}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#111111] border border-[#222222] rounded-lg focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
          <Button variant="outline" className="border-[#222222] hover:bg-[#222222]">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Vehicles Table */}
        <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#222222]">
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Vehicle</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Price/Day</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Seats</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Transmission</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Fuel Type</th>
                  <th className="px-6 py-4 text-right text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-400">Loading vehicles...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-red-400">{error}</td>
                  </tr>
                ) : filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                      {searchQuery ? `No vehicles found matching "${searchQuery}"` : "No vehicles found"}
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-[#222222] hover:bg-[#1A1A1A] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#222222] flex items-center justify-center">
                            <Car className="w-5 h-5 text-[#FF6B35]" />
                          </div>
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-gray-400">{vehicle.year}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            vehicle.status === "Available"
                              ? "bg-green-900/30 text-green-400"
                              : vehicle.status === "Rented"
                              ? "bg-blue-900/30 text-blue-400"
                              : vehicle.status === "Maintenance"
                              ? "bg-red-900/30 text-red-400"
                              : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{vehicle.price}</td>
                      <td className="px-6 py-4 text-gray-400">{vehicle.seats} seats</td>
                      <td className="px-6 py-4 text-gray-400">{vehicle.transmission}</td>
                      <td className="px-6 py-4 text-gray-400">{vehicle.fuelType}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleEditVehicle(vehicle.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => handleDeleteVehicle(vehicle)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] rounded-xl border border-[#222222] w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add New Vehicle</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitVehicle} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Make *</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      placeholder="e.g. Toyota"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Model *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      placeholder="e.g. Camry"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      min="2000"
                      max="2025"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Price/Day *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      placeholder="2500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Seats</label>
                    <select
                      value={formData.seats}
                      onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    >
                      <option value={2}>2 seats</option>
                      <option value={4}>4 seats</option>
                      <option value={5}>5 seats</option>
                      <option value={7}>7 seats</option>
                      <option value={8}>8 seats</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Transmission</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    >
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-400 mb-2">Vehicle Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF6B35] file:text-white hover:file:bg-[#FF5722] file:cursor-pointer cursor-pointer"
                  />
                  {formData.imagePreview && (
                    <div className="relative mt-3">
                      <img 
                        src={formData.imagePreview} 
                        alt="Vehicle Preview" 
                        className="w-full h-32 object-cover rounded-lg border border-[#333333]"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Recommended: 500x300px, max 5MB</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-[#333333] hover:bg-[#222222]"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#FF6B35] hover:bg-[#FF5722]"
                  >
                    Add Vehicle
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] rounded-xl border border-[#222222] w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Delete Vehicle</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 mb-4">
                  Are you sure you want to delete this vehicle? This action cannot be undone.
                </p>
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <div className="flex items-center gap-3">
                    <Car className="w-8 h-8 text-[#FF6B35]" />
                    <div>
                      <div className="font-medium">
                        {selectedVehicle.make} {selectedVehicle.model}
                      </div>
                      <div className="text-sm text-gray-400">
                        {selectedVehicle.year} • {selectedVehicle.price}/day
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-[#333333] hover:bg-[#222222]"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete Vehicle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVehicles 