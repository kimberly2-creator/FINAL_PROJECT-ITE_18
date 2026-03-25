import { useState, useEffect } from "react"
import Navbar from "../components/ui/Default/Navbar"

const Dashboard = () => {
  const [tab, setTab] = useState("reservations")
  const [user, setUser] = useState("")
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    setUser(localStorage.getItem("mockUsername") || "Customer")
    const params = new URLSearchParams(window.location.search)
    if (params.get("tab")) setTab(params.get("tab"))
    // Load reservations for this user
    const email = localStorage.getItem("mockEmail") || "guest"
    const reservationsKey = `userReservations_${email}`
    const res = JSON.parse(localStorage.getItem(reservationsKey) || "[]")
    setReservations(res)
    // Listen for storage changes
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem(reservationsKey) || "[]")
      setReservations(updated)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7f9] to-[#f0f4fa] flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-3xl mx-auto mt-32 p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
        <h2 className="text-2xl font-extrabold mb-6">Welcome, {user}!</h2>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab("reservations")} className={`px-4 py-2 rounded-lg font-bold transition ${tab === "reservations" ? "bg-[#FF6B35] text-white" : "bg-[#fff7f2] text-[#FF6B35] hover:bg-[#ffe3d1]"}`}>My Reservations</button>
          <button onClick={() => setTab("profile")} className={`px-4 py-2 rounded-lg font-bold transition ${tab === "profile" ? "bg-[#FF6B35] text-white" : "bg-[#fff7f2] text-[#FF6B35] hover:bg-[#ffe3d1]"}`}>Profile</button>
        </div>
        {tab === "reservations" && (
          reservations.length === 0 ? (
            <div className="text-gray-700 text-lg text-center py-12">No reservations yet.</div>
          ) : (
            <div className="space-y-6">
              {reservations.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100">
                  <div>
                    <div className="font-bold text-lg mb-1">{r.car.make} {r.car.model} ({r.car.year})</div>
                    <div className="text-gray-500 text-sm mb-1">Pickup: {r.pickup}</div>
                    <div className="text-gray-500 text-sm mb-1">{new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()} ({r.days} days)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FF6B35] font-bold text-xl">₱{r.total.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 mt-1">Booked: {new Date(r.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
        {tab === "profile" && (
          <div className="text-gray-700 text-lg text-center py-12">Profile details and edit form coming soon.</div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 