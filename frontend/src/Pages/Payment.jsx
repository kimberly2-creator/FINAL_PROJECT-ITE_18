import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/ui/Default/Navbar"
import { useState } from "react"

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showXendit, setShowXendit] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#f7f7f9] to-[#f0f4fa]">
        <Navbar />
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 max-w-lg w-full text-center mt-32">
          <h2 className="text-2xl font-bold mb-4">No Payment Data</h2>
          <p className="text-gray-600 mb-6">Please select a car and booking details first.</p>
          <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold px-6 py-3 rounded-xl" onClick={() => navigate("/models")}>Back to Cars</button>
        </div>
      </div>
    )
  }

  const { car, pickup, startDate, endDate, days, subtotal, tax, total } = data

  const handlePayment = () => {
    setShowXendit(true)
  }

  const handleXenditPay = () => {
    // Update car status in adminVehicles
    const adminVehicles = JSON.parse(localStorage.getItem("adminVehicles") || "[]")
    const updatedVehicles = adminVehicles.map(v => v.id === car.id ? { ...v, status: "Rented" } : v)
    localStorage.setItem("adminVehicles", JSON.stringify(updatedVehicles))
    // Add reservation for user
    const userEmail = localStorage.getItem("mockEmail") || "guest"
    const reservationsKey = `userReservations_${userEmail}`
    const reservations = JSON.parse(localStorage.getItem(reservationsKey) || "[]")
    reservations.push({
      car,
      pickup,
      startDate,
      endDate,
      days,
      total,
      timestamp: Date.now()
    })
    localStorage.setItem(reservationsKey, JSON.stringify(reservations))
    // Trigger storage event for real-time sync
    window.dispatchEvent(new Event("storage"))
    setPaymentSuccess(true)
    setTimeout(() => {
      setShowXendit(false)
      navigate("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7f9] to-[#f0f4fa]">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-medium">{car.make} {car.model} ({car.year})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pickup Location</span>
                <span className="font-medium">{pickup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{days} days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (12%)</span>
                <span className="font-medium">₱{tax.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-[#FF6B35]">₱{total.toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-center">{error}</div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-8 bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-4 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing Payment..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
      {/* Mock Xendit Modal */}
      {showXendit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-zoomIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowXendit(false)}>
              ×
            </button>
            <div className="flex flex-col items-center">
              <img src="https://assets-global.website-files.com/5e8cfc60d6b6b37b2b5b2b2c/5f3a2b2b2b2b2b2b2b2b2b2b_xendit-logo.svg" alt="Xendit" className="h-10 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Xendit Payment Gateway</h2>
              <p className="text-gray-600 mb-6">Pay ₱{total.toLocaleString()} for your booking</p>
              {!paymentSuccess ? (
                <button
                  onClick={handleXenditPay}
                  className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-3 rounded-xl transition-colors mb-2"
                >
                  Pay Now
                </button>
              ) : (
                <div className="text-green-600 font-bold text-lg mb-2">Payment Successful!</div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoomIn { animation: zoomIn 0.25s cubic-bezier(.4,2,.6,1); }
      `}</style>
    </div>
  )
}

export default Payment 