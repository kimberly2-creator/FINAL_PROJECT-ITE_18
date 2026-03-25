import { Car, Shield, Clock, CreditCard, Users, MapPin } from "lucide-react"
import Navbar from "@/components/ui/Default/Navbar"
import Footer from "../components/ui/Default/Footer"
import { useRef, useEffect, useState } from "react"

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

const featureData = [
  {
    icon: <Shield className="w-8 h-8 text-[#FF6B35]" />, title: "Fully Insured", desc: "All our vehicles come with comprehensive insurance coverage for your peace of mind.", color: "skeuo-orange"
  },
  {
    icon: <Clock className="w-8 h-8 text-[#6366F1]" />, title: "24/7 Support", desc: "Round-the-clock customer support and roadside assistance whenever you need it.", color: "skeuo-purple"
  },
  {
    icon: <CreditCard className="w-8 h-8 text-[#EC4899]" />, title: "Flexible Payment", desc: "Multiple payment options including GCash, PayMaya, and credit cards.", color: "skeuo-pink"
  },
  {
    icon: <Car className="w-8 h-8 text-[#3B82F6]" />, title: "Modern Fleet", desc: "Well-maintained, modern vehicles from trusted brands like Toyota, Honda, and Ford.", color: "skeuo-blue"
  },
  {
    icon: <Users className="w-8 h-8 text-[#10B981]" />, title: "Expert Team", desc: "Professional staff dedicated to providing excellent customer service and support.", color: "skeuo-green"
  },
  {
    icon: <MapPin className="w-8 h-8 text-[#F59E0B]" />, title: "Multiple Locations", desc: "Convenient pickup locations across Butuan City for easy access.", color: "skeuo-yellow"
  },
]

const About = () => {
  return (
    <>
      <CityLightsBG />
      <Navbar />
      <div className="min-h-screen pt-24 relative z-40">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 animate-slideIn">
              About <span className="text-[#FF6B35]">BNB Car Rental</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeIn">
              Your trusted partner for reliable, affordable, and convenient car rental services in Butuan City and beyond.
            </p>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-slideInLeft">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, BNB Car Rental has been serving the Butuan City community with top-quality vehicle rental services. 
                We understand that transportation is essential for both business and leisure, which is why we've built our fleet 
                around reliability, comfort, and affordability.
              </p>
              <p className="text-gray-700">
                Whether you're planning a family road trip, need a vehicle for business purposes, or require temporary transportation, 
                BNB Car Rental is here to meet your needs with our diverse fleet and exceptional customer service.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-slideInRight">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To provide accessible, reliable, and affordable transportation solutions that empower our customers to explore, 
                work, and live without limitations. We strive to make car rental simple, transparent, and stress-free.
              </p>
              <div className="bg-orange-50/80 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Our Values</h3>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• Customer satisfaction first</li>
                  <li>• Transparent pricing</li>
                  <li>• Quality and safety</li>
                  <li>• Community support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BNB Car Rental?</h2>
            <p className="text-gray-600 text-lg">Experience the difference with our premium services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featureData.map((f, i) => {
              const [ref, inView] = useInView(0.18)
              return (
                <div
                  key={f.title}
                  ref={ref}
                  className={`skeuo-card ${f.color} text-center transition-all duration-500 ease-out transform ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
                  style={{ minHeight: 220, transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-white/50 skeuo-card-icon">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 skeuo-card-title">{f.title}</h3>
                  <p className="text-gray-700 skeuo-card-desc">{f.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6">
              Join thousands of satisfied customers who trust BNB Car Rental for their transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/models"
                className="bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Explore Our Fleet
              </a>
              <a
                href="/contact"
                className="border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .skeuo-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.08), 0 1.5px 0 rgba(255, 255, 255, 0.8) inset;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          padding: 2rem 1.5rem;
          position: relative;
          transition: box-shadow 0.3s, background 0.3s, border 0.3s, color 0.3s;
        }
        .skeuo-card:hover {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px 0 rgba(30, 41, 59, 0.12), 0 2px 0 rgba(255, 255, 255, 0.9) inset;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
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
        .skeuo-orange { background: rgba(255, 247, 237, 0.7); border-color: rgba(251, 146, 60, 0.3); }
        .skeuo-purple { background: rgba(248, 250, 252, 0.7); border-color: rgba(139, 92, 246, 0.3); }
        .skeuo-pink { background: rgba(253, 242, 248, 0.7); border-color: rgba(236, 72, 153, 0.3); }
        .skeuo-blue { background: rgba(239, 246, 255, 0.7); border-color: rgba(59, 130, 246, 0.3); }
        .skeuo-green { background: rgba(240, 253, 244, 0.7); border-color: rgba(16, 185, 129, 0.3); }
        .skeuo-yellow { background: rgba(255, 251, 235, 0.7); border-color: rgba(245, 158, 11, 0.3); }
        
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

export default About 