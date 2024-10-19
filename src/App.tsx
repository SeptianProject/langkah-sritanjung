import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/layouts/Footer"
import Navbar from "./components/layouts/Navbar"
import HomePage from "./components/pages/HomePage"
import DetailPage from "./components/pages/DetailPage"
import RecomendationPage from "./components/pages/RecomendationPage"
import TourPage from "./components/pages/TourPage"
import LoadingMapLocation from "./components/elements/LoadingMapLocation"
import { useState } from "react"

const App = () => {
  const location = useLocation()
  const [isPageLoading, setIsPageLoading] = useState(false)

  const hideNavbarAndFooter =
    location.pathname.startsWith('/tour-guide/') ||
    location.pathname.match(/^\/detail\/[^/]+\/[^/]+\/[^/]+$/) ||
    location.pathname.startsWith('/loading-tour/') || isPageLoading

  return (
    <section className="container max-w-full overflow-hidden selection:text-white selection:bg-secondary scroll-smooth">
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="*" element={<Navigate to={'/'} replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:slug" element={<DetailPage setIsLoading={setIsPageLoading} />} />
        <Route path="/loading-tour/:slug" element={<LoadingMapLocation />} />
        <Route path="/tour-guide/:destination" element={<TourPage />} />
        <Route path="/detail/:slug/:type/:name" element={<RecomendationPage setIsLoading={setIsPageLoading} />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </section>
  )
}

export default App
