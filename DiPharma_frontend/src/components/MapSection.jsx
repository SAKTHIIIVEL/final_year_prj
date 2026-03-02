import './MapSection.css'

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8834657180814!2d80.13335699678959!3d12.850802600000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259003e828dcd%3A0x94b8cc79d4d6e891!2sVELAN%20AVENUE!5e0!3m2!1sen!2sin!4v1765878828725!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DI PHARMA Location Map"
        ></iframe>
      </div>
    </section>
  )
}

export default MapSection

