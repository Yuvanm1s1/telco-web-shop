import NavBar from "./components/NavBar"
import ImageSlideshow from "./components/ImageSlideShow"
function App() {
  
  return (
    <>
      <NavBar/>
      <ImageSlideshow />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the TELCO-WEB-SHOP</h1>
        <p className="text-gray-700">Explore our mobile tariffs and services.</p>
      </div>
    </>
  )
}

export default App
