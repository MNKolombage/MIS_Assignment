export default function MainLayout({ children }) {
  return (
    <div>
      {/* Header sits at top */}
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </div>
  )
}
