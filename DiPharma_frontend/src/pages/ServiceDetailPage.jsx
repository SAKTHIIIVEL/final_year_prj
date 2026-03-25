import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useGetServiceBySlugQuery } from "../store/api";
import ContactSection from "../components/ContactSection";
import "./ServiceDetailPage.css";

const PH_HERO =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=500&fit=crop&q=80";
const PH_OVERVIEW =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80";
const PH_FEATURE =
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop&q=80";
const PH_BENEFIT1 =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=350&fit=crop&q=80";
const PH_BENEFIT2 =
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&h=350&fit=crop&q=80";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeL = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
const fadeR = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetServiceBySlugQuery(slug);
  const service = data?.data;

  if (isLoading)
    return (
      <div className="sd-page">
        <div className="sd-center">
          <div className="sd-spinner" />
          <p>Loading service details...</p>
        </div>
      </div>
    );

  if (isError || !service)
    return (
      <div className="sd-page">
        <div className="sd-center">
          <h2>Service Not Found</h2>
          <p style={{ marginBottom: 24 }}>This service page is being set up.</p>
          <button className="sd-btn" onClick={() => navigate("/services")}>
            ← Back to Services
          </button>
        </div>
      </div>
    );

  const halfBenefits = Math.ceil((service.benefits?.length || 0) / 2);
  const features = service.features || [];
  const leftFeatures = features.filter((_, i) => i % 2 === 0);
  const rightFeatures = features.filter((_, i) => i % 2 !== 0);

  return (
    <div className="sd-page">
      {/* ═══ HERO BANNER ═══ */}
      <section className="sd-hero">
        <img
          src={service.heroImage || PH_HERO}
          alt={service.title}
          className="sd-hero-bg"
        />
        <div className="sd-hero-overlay" />
        <motion.div
          className="sd-hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1>Service Details</h1>
        </motion.div>
      </section>

      {/* ═══ IMAGE LEFT | CONTENT + BUTTON RIGHT ═══ */}
      <section className="sd-overview">
        <div className="sd-overview-wrap">
          <motion.div
            className="sd-overview-img"
            variants={fadeL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={service.overviewImage || PH_OVERVIEW}
              alt={service.title}
            />
          </motion.div>
          <motion.div
            className="sd-overview-content"
            variants={fadeR}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>{service.title}</h2>
            <p>{service.fullDescription || service.shortDescription}</p>
            <motion.button
              className="sd-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                navigate(
                  `/contact?subject=${encodeURIComponent(`Inquiry about ${service.title}`)}#contact`,
                )
              }
            >
              Get In Touch {" >>"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ KEY FEATURES — C1,C2 LEFT | IMAGE CENTER | C3,C4 RIGHT ═══ */}
      {features.length > 0 && (
        <section className="sd-features">
          <div className="sd-glow" />
          <div className="sd-section-inner">
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="sd-kicker">What We Deliver</p>
              <h2 className="sd-section-title">Key Features</h2>
            </motion.div>
            <div className="sd-feat-3col">
              {/* Left column: C1, C2 */}
              <div className="sd-feat-col">
                {leftFeatures.map((f, i) => (
                  <motion.div
                    className="sd-feat-card"
                    key={`l${i}`}
                    variants={fadeL}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="sd-feat-num">
                      {String(i * 2 + 1).padStart(2, "0")}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                    <div className="sd-feat-line" />
                  </motion.div>
                ))}
              </div>
              {/* Center: Image 2 */}
              <motion.div
                className="sd-feat-img"
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={service.featureImage || PH_FEATURE} alt="Features" />
              </motion.div>
              {/* Right column: C3, C4 */}
              <div className="sd-feat-col">
                {rightFeatures.map((f, i) => (
                  <motion.div
                    className="sd-feat-card"
                    key={`r${i}`}
                    variants={fadeR}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="sd-feat-num">
                      {String(i * 2 + 2).padStart(2, "0")}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                    <div className="sd-feat-line" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ BENEFITS — Image3 + B1,B2 then B3,B4 + Image4 ═══ */}
      {service.benefits?.length > 0 && (
        <section className="sd-benefits">
          <div className="sd-section-inner">
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="sd-kicker">Why Choose Us</p>
              <h2 className="sd-section-title">Benefits</h2>
            </motion.div>

            {/* Row 1: Image LEFT — Cards RIGHT */}
            <motion.div
              className="sd-ben-row"
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sd-ben-img-wrap">
                <img src={service.benefitImage1 || PH_BENEFIT1} alt="Benefit" />
              </div>
              <div className="sd-ben-cards">
                {service.benefits.slice(0, halfBenefits).map((b, i) => (
                  <div className="sd-ben-card" key={i}>
                    <span className="sd-ben-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Row 2: Cards LEFT — Image RIGHT */}
            {service.benefits.length > 1 && (
              <motion.div
                className="sd-ben-row"
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="sd-ben-cards">
                  {service.benefits.slice(halfBenefits).map((b, i) => (
                    <div className="sd-ben-card" key={i}>
                      <span className="sd-ben-num">
                        {String(halfBenefits + i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{b.title}</h3>
                        <p>{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sd-ben-img-wrap">
                  <img
                    src={service.benefitImage2 || PH_BENEFIT2}
                    alt="Benefit"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="sd-cta-section">
        <div className="sd-glow" />
        <motion.div
          className="sd-cta-inner"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Get Started?</h2>
          <p>Connect with our team to learn more about {service.title}.</p>
          <motion.button
            className="sd-btn sd-btn-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate(
                `/contact?subject=${encodeURIComponent(`Inquiry about ${service.title}`)}#contact`,
              )
            }
          >
            Contact Us {">>"}
          </motion.button>
        </motion.div>
      </section>

      <ContactSection />
    </div>
  );
};

export default ServiceDetailPage;
