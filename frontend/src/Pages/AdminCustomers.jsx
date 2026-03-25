import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import Navbar from "../components/ui/Default/Navbar"

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    // Aggregate all userReservations_* from localStorage
    const customerMap = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("userReservations_")) {
        const email = key.replace("userReservations_", "")
        const resArr = JSON.parse(localStorage.getItem(key) || "[]")
        if (!customerMap[email]) customerMap[email] = { email, name: "", count: 0 }
        customerMap[email].count += resArr.length
        // Try to get name from first reservation or from mockUsername
        if (resArr.length > 0 && resArr[0].car && !customerMap[email].name) {
          customerMap[email].name = localStorage.getItem("mockUsername") || "Customer"
        }
      }
    }
    setCustomers(Object.values(customerMap))
    // Listen for storage changes
    const handleStorage = () => {
      const updatedMap = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("userReservations_")) {
          const email = key.replace("userReservations_", "")
          const resArr = JSON.parse(localStorage.getItem(key) || "[]")
          if (!updatedMap[email]) updatedMap[email] = { email, name: "", count: 0 }
          updatedMap[email].count += resArr.length
          if (resArr.length > 0 && resArr[0].car && !updatedMap[email].name) {
            updatedMap[email].name = localStorage.getItem("mockUsername") || "Customer"
          }
        }
      }
      setCustomers(Object.values(updatedMap))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* <Navbar /> */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Customers</h1>
        {customers.length === 0 ? (
          <div className="text-gray-400 text-lg">No customers found.</div>
        ) : (
          <div className="space-y-6">
            {customers.map((c, i) => (
              <div key={i} className="bg-[#111111] rounded-xl border border-[#222222] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-bold text-lg mb-1">
                    <Link to={`/admin/customers/${encodeURIComponent(c.email)}`} className="hover:underline text-[#FF6B35]">{c.name || "Customer"}</Link>
                  </div>
                  <div className="text-gray-400 text-sm mb-1">Email: {c.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#FF6B35] font-bold text-xl">{c.count} reservation{c.count !== 1 ? "s" : ""}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCustomers 