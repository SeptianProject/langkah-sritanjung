import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/layouts/Footer"
import Navbar from "./components/layouts/Navbar"
import HomePage from "./components/pages/HomePage"
import DetailPage from "./components/pages/DetailPage"
import RekomendationPage from "./components/pages/RekomendationPage"
import TourPage from "./components/pages/TourPage"

const App = () => {
  const location = useLocation()

  const hideNavbar =
    location.pathname === '/tour-guide' ||
    location.pathname === '/detail-rekomendasi'

  const hideFooter =
    location.pathname === '/tour-guide' ||
    location.pathname === '/detail-rekomendasi'

  return (
    <section className="container max-w-full overflow-hidden selection:text-white selection:bg-secondary scroll-smooth">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/tour-guide" element={<TourPage />} />
        <Route path="/detail-rekomendasi" element={<RekomendationPage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </section>
  )
}

export default App