import { useEffect, useState } from "react"

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    // Aggregate all userReservations_* from localStorage
    const allReservations = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("userReservations_")) {
        const email = key.replace("userReservations_", "")
        const resArr = JSON.parse(localStorage.getItem(key) || "[]")
        resArr.forEach(r => allReservations.push({ ...r, email }))
      }
    }
    setReservations(allReservations)
    // Listen for storage changes
    const handleStorage = () => {
      const updated = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("userReservations_")) {
          const email = key.replace("userReservations_", "")
          const resArr = JSON.parse(localStorage.getItem(key) || "[]")
          resArr.forEach(r => updated.push({ ...r, email }))
        }
      }
      setReservations(updated)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* <Navbar /> */}
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">All Reservations</h1>
        {reservations.length === 0 ? (
          <div className="text-gray-400 text-lg">No reservations found.</div>
        ) : (
          <div className="space-y-6">
            {reservations.map((r, i) => (
              <div key={i} className="bg-[#111111] rounded-xl border border-[#222222] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-bold text-lg mb-1">{r.car.make} {r.car.model} ({r.car.year})</div>
                  <div className="text-gray-400 text-sm mb-1">User: {r.email}</div>
                  <div className="text-gray-400 text-sm mb-1">Pickup: {r.pickup}</div>
                  <div className="text-gray-400 text-sm mb-1">{new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()} ({r.days} days)</div>
                </div>
                <div className="text-right">
                  <div className="text-[#FF6B35] font-bold text-xl">₱{r.total.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">Booked: {new Date(r.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminReservations 