export default function Header() {
  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">Nisala Villa</div>
        <nav className="space-x-4">
          <a className="text-gray-700 hover:text-gray-900" href="#">Home</a>
          <a className="text-gray-700 hover:text-gray-900" href="#about">About</a>
          <a className="text-gray-700 hover:text-gray-900" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
