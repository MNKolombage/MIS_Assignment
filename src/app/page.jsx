import Hero from '../components/sections/Hero'
import OurRestaurant from '../components/sections/Our_Restaurant'
import PlanYourTrip from '../components/sections/Plan_Your_Trip'
import Gallery from '../components/sections/Gallery'
import ContactSection from '../components/sections/Contact'
import BookYourStay from '../components/sections/Book_Your_Stay'

export default function Page() {
	return (
		<>
			<Hero />
			<OurRestaurant />
			<PlanYourTrip />
			<Gallery />
			<ContactSection />
			<BookYourStay />
		</>
	)
}
