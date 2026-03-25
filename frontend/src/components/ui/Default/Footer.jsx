import { Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => (
  <footer className="w-full bg-[#1a1a1a] text-white py-10 px-4 mt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="text-2xl font-extrabold mb-2 text-[#FF6B35]">BNB Car Rental</div>
        <div className="text-gray-400 mb-4">Laurente Bldg, Butuan City</div>
        <div className="flex items-center gap-2 text-gray-400 mb-1"><Mail className="w-4 h-4 text-[#FF6B35]" /> callipdoba@gmail.com</div>
        <div className="flex items-center gap-2 text-gray-400 mb-1"><Phone className="w-4 h-4 text-[#FF6B35]" /> 09153343379</div>
        <div className="flex items-center gap-2 text-gray-400"><MapPin className="w-4 h-4 text-[#FF6B35]" /> Butuan City</div>
      </div>
      <div>
        <div className="font-bold mb-2 text-[#FF6B35]">Quick Links</div>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-[#FF6B35]">Home</Link></li>
          <li><Link to="/models" className="hover:text-[#FF6B35]">Explore Cars</Link></li>
          <li><Link to="/about" className="hover:text-[#FF6B35]">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#FF6B35]">Contact</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-bold mb-2 text-[#FF6B35]">Business Hours</div>
        <div className="text-gray-400">Mon-Fri: 9:00 AM - 6:00 PM</div>
        <div className="text-gray-400">Sat: 10:00 AM - 4:00 PM</div>
        <div className="text-gray-400">Sun: Closed</div>
      </div>
      <div>
        <div className="font-bold mb-2 text-[#FF6B35]">Follow Us</div>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-[#FF6B35]" aria-label="Facebook"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" /></svg></a>
          <a href="#" className="hover:text-[#FF6B35]" aria-label="Instagram"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></a>
          <a href="#" className="hover:text-[#FF6B35]" aria-label="Twitter"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a9.1 9.1 0 0 1-2.6.71z" /></svg></a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-8">&copy; {new Date().getFullYear()} BNB Car Rental. All rights reserved.</div>
  </footer>
)

export default Footer 