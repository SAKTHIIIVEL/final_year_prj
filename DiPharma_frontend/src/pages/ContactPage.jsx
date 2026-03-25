import ContactSectionWithBanner from '../components/ContactSectionWithBanner'
import ContactSection from '../components/ContactSection'
import MapSection from '../components/MapSection'
import FAQSection from '../components/FAQSection'
import './ContactPage.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ContactPage = () => {
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
    <div className="contact-page">
      <ContactSectionWithBanner />
      <ContactSection />
      <MapSection />
      <FAQSection />
      
    </div>
  )
}

export default ContactPage

