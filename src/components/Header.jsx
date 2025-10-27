import Notifications from './Notifications';
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">Nisala Villa</div>
        <nav className="space-x-4 flex items-center gap-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <a className="text-gray-700 hover:text-gray-900" href="#about">About</a>
          <a className="text-gray-700 hover:text-gray-900" href="#contact">Contact</a>
          <Link href="/book-your-stay">
            <button className="mt-4 bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-md shadow-md">
              Book Your Stay
            </button>
          </Link>
          {/* Notification Bell */}
          <Notifications userRole="user" />
        </nav>
      </div>
    </header>
  );
}
