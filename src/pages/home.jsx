import Hero from '../components/sections/Hero'
import OurRestaurant from '../components/sections/Our_Restaurant'
import PlanYourTrip from '../components/sections/Plan_Your_Trip'
import Gallery from '../components/sections/Gallery'
import ContactSection from '../components/sections/Contact'
import Review from '../components/sections/review'

export default function Home() {
    return (
        <>
            <Hero />
            <OurRestaurant />
            <PlanYourTrip />
            <Gallery />
            <Review/>
            <ContactSection />
        </>
    )
}
