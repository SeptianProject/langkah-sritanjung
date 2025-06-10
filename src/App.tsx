import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/layouts/Footer"
import Navbar from "./components/layouts/Navbar"
import HomePage from "./components/pages/HomePage"
import DetailPage from "./components/pages/DetailPage"
import RecomendationPage from "./components/pages/RecomendationPage"
import TourPage from "./components/pages/TourPage"
import LoadingMapLocation from "./components/elements/LoadingMapLocation"
import { useEffect, useState } from "react"
import LoadingSplash from "./components/pages/LoadingSplash"
// import { assets } from "./assets/asset"
// import ChatBot from "./components/elements/ChatBot"

const App = () => {
  const location = useLocation()
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  // const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false)
    }, 5000);
  }, [])

  if (isInitialLoading && location.pathname === '/') {
    return <LoadingSplash onLoadingComplete={() => setIsInitialLoading(false)} />
  }

  const hideNavbarAndFooter =
    location.pathname.startsWith('/tour-guide/') ||
    location.pathname.match(/^\/detail\/[^/]+\/[^/]+\/[^/]+$/) ||
    location.pathname.startsWith('/loading-tour/') || isPageLoading

  return (
    <section className="container max-w-full overflow-hidden scroll-smooth">
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="*" element={<Navigate to={'/'} replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/loading-tour/:slug" element={<LoadingMapLocation />} />
        <Route path="/tour-guide/:destination" element={<TourPage />} />
        <Route path="/detail" >
          <Route path=":slug" element={<DetailPage />} />
          <Route path=":slug/:type/:typeSlug" element={<RecomendationPage setIsLoading={setIsPageLoading} />} />
        </Route>
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
      {/* <div className="fixed bottom-2 right-4 z-50">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="rounded-full">
          <img src={assets.chatBot} alt="ChatAI" className="size-11 md:size-12" />
        </button>
        <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div> */}
    </section>
  )
}

export default App
