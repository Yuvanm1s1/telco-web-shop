import NavBar from "./components/NavBar"
import ImageSlideshow from "./components/ImageSlideShow"
import FAQ from "./components/FAQ"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  
  return (
    <>
    <div className="overflow-x-hidden">
      <NavBar/>
      <ImageSlideshow />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the TELCO-WEB-SHOP</h1>
        <p className="text-gray-700">Explore our mobile tariffs and services.</p>
      </div>
      <footer className="bg-gray-700 py-4 mt-8">
        <div className="container mx-auto text-center">
          <FAQ/>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
