import ContactSectionWithBanner from '../components/ContactSectionWithBanner'
import ContactSection from '../components/ContactSection'
import MapSection from '../components/MapSection'
import FAQSection from '../components/FAQSection'
import './ContactPage.css'

const ContactPage = () => {
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

