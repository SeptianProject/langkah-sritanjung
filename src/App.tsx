import { Route, Routes } from "react-router-dom"
import Footer from "./components/layouts/Footer"
import Navbar from "./components/layouts/Navbar"
import HomePage from "./components/pages/HomePage"
import DetailPage from "./components/pages/DetailPage"
import RekomendationPage from "./components/pages/RekomendationPage"
import TourPage from "./components/pages/TourPage"

const App = () => {
  return (
    <section className="container max-w-full overflow-hidden selection:text-white selection:bg-secondary scroll-smooth">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/tour-gate" element={<TourPage />} />
        <Route path="/detail-rekomendasi" element={<RekomendationPage />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App