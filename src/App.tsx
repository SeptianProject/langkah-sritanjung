import { Route, Routes } from "react-router-dom"
import Footer from "./components/layouts/Footer"
import Navbar from "./components/layouts/Navbar"
import LandingPage from "./components/pages/LandingPage"

const App = () => {
  return (
    <section className="container max-w-full overflow-hidden selection:text-white selection:bg-secondary scroll-smooth">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App