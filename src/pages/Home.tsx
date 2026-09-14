import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import WhatsAppButton from "../components/layout/WhatsAppButton"
import Hero from "../components/home/Hero"
import About from "../components/home/About"
import Catalog from "../components/home/Catalog"
import Location from "../components/home/Location"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
