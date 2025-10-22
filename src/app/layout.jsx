import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export const metadata = {
	title: 'Nisala Villa',
	description: 'Welcome to Nisala Villa',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main>{children}</main>
				<Chatbot />
				<Footer />
			</body>
		</html>
	)
}
