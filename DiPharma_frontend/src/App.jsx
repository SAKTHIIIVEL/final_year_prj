import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import CareerPage from './pages/CareerPage'
import './App.css'
import NoPageAvailable from './pages/NoPageAvailable'
import Header from './components/Header'
import Footer from './components/Footer'
import ServicePage from './pages/ServicePage'
import AboutPage from './pages/AboutPage'
import FlightTimeline from './components/FlightTimeline'
import HomePage from './pages/HomePage'
import GlobeSvg from './components/GlobeSvg'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path='/flight' element={<FlightTimeline/>} />
        <Route path="*" element={<NoPageAvailable/>} />
        <Route path='/globe' element={<GlobeSvg/>} />
        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

