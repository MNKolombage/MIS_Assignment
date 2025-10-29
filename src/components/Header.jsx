import Notifications from './Notifications'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow">
      <div className="max-w-full mx-auto px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-bold">Nisala Villa</div>
        <nav className="space-x-4 flex items-center gap-4">
          <a className="text-gray-700 hover:text-gray-900" href="#home">Home</a>
          <a className="text-gray-700 hover:text-gray-900" href="#restaurant">Dining at Nisala</a>
          <a className="text-gray-700 hover:text-gray-900" href="#plan-your-trip">Plan Your Trip</a>
          <a className="text-gray-700 hover:text-gray-900" href="#gallery">Gallery</a>
          <a className="text-gray-700 hover:text-gray-900" href="#contact">Contact</a>
          {/* Notification Bell */}
          <Notifications userRole="user" />
          <a 
            href="#book-your-stay" 
            className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            Book Your Stay
          </a>
        </nav>
      </div>
    </header>
  )
}
