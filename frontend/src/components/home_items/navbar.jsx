

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



 


  return (
    <>
















      <nav className="shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-black text-lg font-bold">TravelEase</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-8">
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Hotels
                </button>
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Cars
                </button>
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Rental
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:flex items-center space-x-4">
              <button className="bg-white text-[#E61E51] px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]">
          <Link to="/login">Login</Link>
                  </button>
                <button className="bg-[#E61E51] text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                <Link to="/signup">Sign up</Link>
              </button>
              </div>
              <div className="sm:hidden flex items-center space-x-2 mr-2">
                <button
                  className="bg-white text-[#E61E51] px-3 py-1 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]"
                >
                </button>
                <button className="bg-[#E61E51] text-white px-3 py-1 rounded-md text-base font-medium hover:bg-rose-800 transition-colors duration-300">
                  Sign up
                </button>
              </div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-black hover:text-gray-700 focus:outline-none transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {/* Mobile menu button icons remain the same */}
              </button>
            </div>
          </div>
                  
          {isMobileMenuOpen && (
            <div className="sm:hidden bg-[#E61E51]">
              <div className="px-2 pt-2 pb-3 space-y-2">
                <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                  Hotels
                </button>
                <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                  Cars
                </button>
                <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                  Rental
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;