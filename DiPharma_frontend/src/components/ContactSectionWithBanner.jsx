import { useState } from "react";
import "./ContactSectionWithBanner.css";
import "./ContactSection.css";

const ContactSectionWithBanner = () => {
  return (
    <section className="contact-banner-section">
      {/* HERO BANNER */}
      <div className="contact-banner-container">
        <div className="banner-image-overlay">
          <div className="banner-image-wrapper">
            <div className="banner-image-placeholder">
              <div className="banner-image-content" />
            </div>
            <div className="banner-dark-overlay" />
          </div>
        </div>

        <div className="banner-content">
          <div className="banner-text-left">
            <h2 className="banner-question">Questions? Concerns? Enquiries?</h2>
            <p className="banner-subtitle">We are here to support you!</p>
          </div>

          <div className="banner-title-wrapper">
            <h1 className="banner-title">Contact Us</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionWithBanner;
