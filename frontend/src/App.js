import React from 'react'
import Navbar from "./components/navbar/navbar"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import About from "./pages/about/about"
import Contact from "./pages/contact/contact"
import Footer from "./pages/home/footer"
import Home from "./pages/home/home"
import Pick from "./pages/pick/pick"
import Services from './pages/services/Services'
import Blog from './pages/blog/Blog'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/about' element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/schedule-pickup" element={<Pick/>}/>
        <Route path="/blogs" element={<Blog/>}/>
      </Routes>
      <Footer/>
      
    </BrowserRouter>

    </>
  )
}

export default App