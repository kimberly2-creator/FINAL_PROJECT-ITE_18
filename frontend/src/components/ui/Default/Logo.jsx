const Logo = ({ scrolled = false }) => {
  return (
    <div className={`flex items-center transition-all duration-300 ${scrolled ? "scale-95" : ""}`}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 rounded-lg rotate-6 opacity-10"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-gray-900 relative z-10"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </div>
      <div className="ml-2 flex gap-2 items-baseline">
        <span className="font-bold text-orange-500 text-2xl">BNB</span>
        <span className="font-bold text-gray-900 text-2xl">Car</span>
        <span className="font-bold text-gray-900 text-2xl"> Rental</span>
      </div>
    </div>
  )
}

export default Logo
