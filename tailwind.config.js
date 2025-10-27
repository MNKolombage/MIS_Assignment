module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8A1414",
        primaryHover: "#A71A1A",
        accent: "#B62424",
        softBg: "#F9ECEC",
      },
    },
  },
  plugins: [
    // Optional plugin; keep require in try/catch to avoid runtime crash if package is missing during dev
    (function () {
      try {
        return require('tailwind-scrollbar-hide')
      } catch (e) {
        // plugin not installed; ignore
        return () => {}
      }
    })()
  ],
}