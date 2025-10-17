import Hero from '../components/sections/Hero'
import Button from '../components/ui/Button'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <Button onClick={() => alert('Book now!')}>Book Now</Button>
      </div>
    </main>
  )
}
