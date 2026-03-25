import {
  Star,
  Shield,
  Clock,
  CreditCard,
  ArrowRight,
  HelpCircle,
  Car,
  MapPin,
  Calendar,
  CreditCardIcon as PaymentIcon,
  CheckCircle,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MouseTrail } from "@stichiboi/react-elegant-mouse-trail"
import Navbar from "../components/ui/Default/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import Footer from "../components/ui/Default/Footer"

// Add these styles to the top of the file if using CSS-in-JS, or move to your CSS file if preferred
const skeuoStyles = `
.skeuo-card {
  background: #f7f7f9;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.06), 0 1.5px 0 #fff inset;
  border: 1.5px solid #ececec;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  position: relative;
  min-height: 320px;
  transition: box-shadow 0.3s, background 0.3s, border 0.3s, color 0.3s;
}
.skeuo-card-hover {
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(30, 41, 59, 0.12), 0 2px 0 #fff inset;
  border: 1.5px solid #e0e0e0;
}
.skeuo-card .skeuo-card-title {
  color: #181820;
}
.skeuo-card .skeuo-card-desc {
  color: #444;
}
.skeuo-card .skeuo-card-icon {
  filter: drop-shadow(0 2px 6px rgba(30,41,59,0.10));
}
@media (max-width: 1024px) {
  .skeuo-card {
    min-height: 260px;
    padding: 2rem 1rem 2rem 1rem;
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('skeuo-styles')) {
  const style = document.createElement('style');
  style.id = 'skeuo-styles';
  style.innerHTML = skeuoStyles;
  document.head.appendChild(style);
}

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

// Add dark mode support for the city lights background
const cityLightsDarkStyles = `
html.dark .city-lights-bg {
  opacity: 0.38 !important;
  filter: blur(40px) brightness(0.7) saturate(1.3) !important;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('city-lights-dark-styles')) {
  const style = document.createElement('style');
  style.id = 'city-lights-dark-styles';
  style.innerHTML = cityLightsDarkStyles;
  document.head.appendChild(style);
}

// Add Google Fonts import for Nunito (rounded, bold)
if (typeof document !== 'undefined' && !document.getElementById('nunito-font')) {
  const link = document.createElement('link');
  link.id = 'nunito-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap';
  document.head.appendChild(link);
}

// Add intersection observer hook
const useInView = (threshold = 0.2) => {
  const ref = useRef()
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

const Home = () => {
  const [search, setSearch] = useState("")
  const [searchFocus, setSearchFocus] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/models?search=${encodeURIComponent(search.trim())}`)
    }
  }

  // Intersection observer refs for animations
  const [featuresRef, featuresInView] = useInView(0.2)
  const [howItWorksRef, howItWorksInView] = useInView(0.2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7f9] to-[#f0f4fa] flex flex-col items-center justify-start relative">
      {searchFocus && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-all" onClick={() => { setSearchFocus(false); searchRef.current.blur(); }} />
      )}
      <CityLightsBG />
      <Navbar />
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-8 px-4 relative z-40">
        <div className="max-w-5xl w-full mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-slideIn" style={{ fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 900 }}>
            Barato nga <span className="text-[#FF6B35]">RENTALS!</span><br />Premium na <span className="text-[#FF6B35]">Service!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium animate-fadeIn">
            Explore Butuan and beyond with BNB Car Rental — where premium Quality meets affordability!
          </p>
          {/* Car Brand Search */}
          <form className="flex items-center justify-center gap-2 w-full mb-10 animate-fadeIn" onSubmit={handleSearch}>
            <div className="relative w-full max-w-md mx-auto">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 120)}
                placeholder="Search for a car brand (e.g. Toyota, Honda)"
                className="w-full py-4 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-lg transition duration-900"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </form>
          {/* Features Row */}
          <div ref={featuresRef} className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-2 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#fff7f2] shadow-sm animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
              <Shield className="w-6 h-6 text-[#FF6B35]" />
              <span className="font-semibold text-gray-800">Fully Insured</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#fff7f2] shadow-sm animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              <Clock className="w-6 h-6 text-[#FF6B35]" />
              <span className="font-semibold text-gray-800">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#fff7f2] shadow-sm animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
              <CreditCard className="w-6 h-6 text-[#FF6B35]" />
              <span className="font-semibold text-gray-800">Flexible Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={howItWorksRef} className={`text-center mb-16 transition-all duration-700 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center bg-orange-100 text-[#FF6B35] px-4 py-2 rounded-full mb-4 animate-fadeIn">
              <HelpCircle className="w-4 h-4 mr-2" /> How It Works?
            </div>
            <h2 className="text-4xl font-bold mb-4 animate-slideIn">Rent Your Dream Car in 4 Easy Steps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fadeIn">
              We've streamlined our rental process to get you on the road quickly and safely.
              <br />
              Follow these simple steps to begin your journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 relative">
            {/* Connecting lines between steps (visible on lg screens) */}
            <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

            {/* Step 1 */}
            {[
              { icon: <Car className="w-12 h-12 text-blue-400 group-hover:text-blue-600 transition-all duration-300 skeuo-card-icon" />, title: "Select Your Car", desc: "Choose from our wide range of premium vehicles for any occasion", color: "blue", number: 1 },
              { icon: <MapPin className="w-12 h-12 text-green-400 group-hover:text-green-600 transition-all duration-300 skeuo-card-icon" />, title: "Pick-up Location", desc: "Select from our numerous convenient pick-up and drop-off locations", color: "green", number: 2 },
              { icon: <Calendar className="w-12 h-12 text-purple-400 group-hover:text-purple-600 transition-all duration-300 skeuo-card-icon" />, title: "Pick-up Date", desc: "Choose your rental duration and preferred pick-up timing", color: "purple", number: 3 },
              { icon: <PaymentIcon className="w-12 h-12 text-orange-400 group-hover:text-orange-600 transition-all duration-300 skeuo-card-icon" />, title: "Make Payment", desc: "Quick and secure payment with multiple payment options", color: "orange", number: 4 }
            ].map((step, index) => {
              const [stepRef, stepInView] = useInView(0.18)
              return (
                <div key={step.number} className="relative z-10 group" ref={stepRef}>
                  <div className={`skeuo-card group-hover:skeuo-card-hover transition-all duration-500 ease-out transform ${stepInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                    <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-inner flex items-center justify-center font-bold border-2 border-${step.color}-200 group-hover:border-${step.color}-400 transition-all duration-300`}>
                      <span className={`text-${step.color}-500 group-hover:text-white group-hover:bg-${step.color}-500 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300`}>{step.number}</span>
                    </div>
                    <div className="flex justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4 skeuo-card-title">{step.title}</h3>
                    <p className="skeuo-card-desc text-center">{step.desc}</p>
                    <div className="flex justify-center mt-6">
                      <CheckCircle className="w-6 h-6 text-gray-300 group-hover:text-green-400 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-16">
            <Link to="/login">
              <Button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-6 rounded-lg transition-transform duration-300 hover:scale-105 h-auto animate-fadeIn">
                Book Car Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MouseTrail strokeColor="color-black" lineWidthStart={20} />
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
      `}</style>
    </div>
  )
}

export default Home
