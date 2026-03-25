import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import About from "./Pages/About"
import ExploreCars from "./Pages/ExploreCars"
import Payment from "./Pages/Payment"
import Dashboard from "./Pages/Dashboard"
import AdminLogin from "./Pages/AdminLogin"
import AdminDashboard from "./Pages/AdminDashboard"
import AdminVehicles from "./Pages/AdminVehicles"
import AdminReservations from "./Pages/AdminReservations"
import AdminCustomers from "./Pages/AdminCustomers"
import AdminCustomerDetails from "./Pages/AdminCustomerDetails"
import Contact from "./Pages/Contact"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<ExploreCars />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vehicles" element={<AdminVehicles />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/customers/:email" element={<AdminCustomerDetails />} />
      </Routes>
    </Router>
  )
}

export default App
