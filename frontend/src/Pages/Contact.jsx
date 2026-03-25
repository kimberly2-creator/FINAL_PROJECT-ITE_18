import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Footer from "../components/ui/Default/Footer"
import Navbar from "../components/ui/Default/Navbar"

// Add city lights SVG background as a React component
const CityLightsBG = () => (
  <svg
    className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none city-lights-bg"
    style={{
      minHeight: '100vh',
      minWidth: '100vw',
      filter: 'blur(32px) saturate(1.2)',
      opacity: '0.55',
      transition: 'opacity 0.4s',
    }}
    aria-hidden="true"
    viewBox="0 0 1440 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="city1" cx="0.7" cy="0.8" r="1.1">
        <stop offset="0%" stopColor="#FFD580" />
        <stop offset="80%" stopColor="#FF6B35" stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="city2" cx="0.2" cy="0.7" r="1.1">
        <stop offset="0%" stopColor="#7ED7FF" />
        <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.18" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="city3" cx="0.5" cy="0.2" r="1.1">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="80%" stopColor="#6366F1" stopOpacity="0.13" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="city4" cx="0.8" cy="0.3" r="1.1">
        <stop offset="0%" stopColor="#FFB385" />
        <stop offset="80%" stopColor="#FF6B35" stopOpacity="0.13" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="1200" cy="800" rx="400" ry="180" fill="url(#city1)" />
    <ellipse cx="300" cy="700" rx="320" ry="140" fill="url(#city2)" />
    <ellipse cx="800" cy="200" rx="260" ry="120" fill="url(#city3)" />
    <ellipse cx="1100" cy="300" rx="180" ry="80" fill="url(#city4)" />
  </svg>
)

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill out all fields.")
      return
    }
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <>
      <CityLightsBG />
      <Navbar />
      <div className="min-h-[60vh] flex flex-col items-center pt-24 pb-8 px-6 relative z-40">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <span className="inline-block bg-[#fff7f2]/80 backdrop-blur-sm text-[#FF6B35] font-bold px-4 py-1 rounded-full mb-4 animate-fadeIn">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slideIn text-gray-900">Get in <span className="text-[#FF6B35]">Touch</span></h1>
            <p className="text-gray-700 text-lg animate-fadeIn">We'd love to hear from you. Let us know how we can help make your car rental experience even better.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Info Cards */}
            <div className="flex flex-col gap-6 animate-slideInLeft">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-blue-50/70 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 shadow hover:scale-105 transition-transform">
                  <Phone className="w-7 h-7 text-blue-400" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">Phone</div>
                    <div className="text-gray-700">+63 915-3343-379</div>
                  </div>
                </div>
                <div className="flex-1 bg-orange-50/70 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 shadow hover:scale-105 transition-transform">
                  <Mail className="w-7 h-7 text-orange-400" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">Email</div>
                    <div className="text-gray-700">callipdoba@gmail.com</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-green-50/70 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 shadow hover:scale-105 transition-transform">
                  <MapPin className="w-7 h-7 text-green-400" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">Location</div>
                    <div className="text-gray-700">Laurente Bldg, Butuan City</div>
                  </div>
                </div>
                <div className="flex-1 bg-purple-50/70 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 shadow hover:scale-105 transition-transform">
                  <Clock className="w-7 h-7 text-purple-400" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">Business Hours</div>
                    <div className="text-gray-700">Mon-Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM<br/>Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col gap-4 animate-slideInRight">
              <h2 className="text-2xl font-bold mb-2 text-[#FF6B35]">Send Us a Message</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FF6B35] bg-white/90 backdrop-blur-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FF6B35] bg-white/90 backdrop-blur-sm"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FF6B35] bg-white/90 backdrop-blur-sm"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FF6B35] min-h-[120px] bg-white/90 backdrop-blur-sm"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-5 h-5" /> {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,2,.6,1); }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.7s cubic-bezier(.4,2,.6,1); }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.7s cubic-bezier(.4,2,.6,1); }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight { animation: slideInRight 0.7s cubic-bezier(.4,2,.6,1); }
      `}</style>
    </>
  )
}

export default Contact 