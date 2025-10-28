export default function Footer() {
  return (
    <footer className="bg-red-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Social icons row */}
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Twitter" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.924c-.67.296-1.39.496-2.145.586a3.75 3.75 0 001.648-2.066 7.48 7.48 0 01-2.377.908 3.73 3.73 0 00-6.356 3.402A10.58 10.58 0 013 5.87a3.73 3.73 0 001.155 4.98 3.66 3.66 0 01-1.69-.467v.047a3.73 3.73 0 002.993 3.655 3.8 3.8 0 01-1.684.064 3.74 3.74 0 003.487 2.588A7.48 7.48 0 012 19.54a10.53 10.53 0 005.708 1.673c6.847 0 10.588-5.671 10.588-10.588 0-.161-.004-.321-.01-.48A7.56 7.56 0 0022 5.924z" />
              </svg>
            </a>

            <a href="#" aria-label="Instagram" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zM18.75 6.5a1.125 1.125 0 11-1.125-1.125A1.125 1.125 0 0118.75 6.5z" />
              </svg>
            </a>

            <a href="#" aria-label="LinkedIn" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 102.48 6a2.5 2.5 0 002.5-2.5zM3 9h4v12H3zM9 9h3.75v1.6h.05A4.1 4.1 0 0119 9.5C22 9.5 23 11.6 23 15.1V21h-4v-5.1c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z" />
              </svg>
            </a>

            <a href="#" aria-label="Messenger" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.03 2 11c0 2.77 1.52 5.27 3.85 6.96V22l4.03-2.22c.93.26 1.92.4 2.99.4 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.1 12L9 12.2 5.9 14l5.2-6L15 9.8l3.1-1.8-5 5z" />
              </svg>
            </a>

            <a href="#" aria-label="Facebook" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3H14v7A10 10 0 0022 12z" />
              </svg>
            </a>
          </div>

          {/* Copyright line */}
          <div className="text-center text-xs text-gray-200">
            © {new Date().getFullYear()} Nisala Villa. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
