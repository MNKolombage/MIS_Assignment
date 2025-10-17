import '../styles/globals.css'
import MainLayout from '../components/layout/MainLayout'
import Header from '../components/Header'

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Header />
      <Component {...pageProps} />
    </MainLayout>
  )
}
