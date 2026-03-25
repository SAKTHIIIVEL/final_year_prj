import React from 'react'
import Home from '../components/Home'
import About from '../components/About'
import Services from '../components/Services'
import Products from '../components/Products'
import Partners from '../components/Partners'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import StayConected from '../components/StayConected'
import './HomePage.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);
  return (
    <div className='home-page'>
        <Home />
        <About/>
        <Services/>
        <Products/>
        <Partners/>
        <FAQSection/>
        <ContactSection/>
        <StayConected />
    </div>
  )
}

export default HomePage