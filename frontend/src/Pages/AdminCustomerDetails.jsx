import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

const AdminCustomerDetails = () => {
  const { email } = useParams()
  const [reservations, setReservations] = useState([])
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const reservationsKey = `userReservations_${email}`
    const res = JSON.parse(localStorage.getItem(reservationsKey) || "[]")
    setReservations(res)
    // Try to get user info from the first reservation or localStorage
    let info = {}
    if (res.length > 0) {
      info = {
        name: localStorage.getItem("mockUsername") || "Customer",
        email,
        license: res[0].licenseNumber || "Not available",
        id: res[0].idNumber || "Not available",
        phone: res[0].phone || "Not available"
      }
    } else {
      info = {
        name: localStorage.getItem("mockUsername") || "Customer",
        email,
        license: "Not available",
        id: "Not available",
        phone: "Not available"
      }
    }
    setUserInfo(info)
  }, [email])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/admin/customers" className="text-[#FF6B35] hover:underline">&larr; Back to Customers</Link>
        <h1 className="text-3xl font-bold mb-4 mt-4">Customer Details</h1>
        <div className="bg-[#111111] rounded-xl border border-[#222222] p-6 mb-8">
          <div className="font-bold text-lg mb-2">{userInfo.name}</div>
          <div className="text-gray-400 text-sm mb-1">Email: {userInfo.email}</div>
          <div className="text-gray-400 text-sm mb-1">Phone: {userInfo.phone}</div>
          <div className="text-gray-400 text-sm mb-1">License: {userInfo.license}</div>
          <div className="text-gray-400 text-sm mb-1">ID: {userInfo.id}</div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Reservations</h2>
        {reservations.length === 0 ? (
          <div className="text-gray-400">No reservations found for this customer.</div>
        ) : (
          <div className="space-y-6">
            {reservations.map((r, i) => (
              <div key={i} className="bg-[#111111] rounded-xl border border-[#222222] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-bold text-lg mb-1">{r.car.make} {r.car.model} ({r.car.year})</div>
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

export default AdminCustomerDetails 