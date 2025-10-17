export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      {children}
    </button>
  )
}
