import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import doc from "../assets/about/doctor.jpg";
import bulding from "../assets/about/homeAbout.jpg";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>
            DI Polyclinic offers comprehensive medical services with advanced
            technology
          </h2>
          <p>
            Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare
            organization committed to delivering comprehensive and accessible
            medical services to the community.
          </p>
          <motion.div className={styles.arrowButton} whileHover={{ x: 10 }} onClick={()=> navigate('/about')}>
            <svg
              width="79"
              height="79"
              viewBox="0 0 79 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="39.5" cy="39.5" r="39" stroke="white" />
              <path
                d="M23 40H56M56 40L43.625 56M56 40L43.625 24"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className={styles.imageGrid}>
          {/* Abstract layouts with pills/capsules shape as per design */}
          <motion.div
            className={`${styles.imageCard} ${styles.cardLarge}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={doc} alt="Dr Will" className={styles.cardImage} />
            <div className={styles.badge}>
              Dr Will
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="27" height="27" rx="13.5" fill="#3F3BAE" />
                <path
                  d="M8.00008 12.8889H18.6667M18.6667 12.8889L14.6667 17.7778M18.6667 12.8889L14.6667 8"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.imageCard} ${styles.cardSmall} ${styles.topRight}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img src={bulding} alt="DI Pharma" className={styles.cardImage} />
            <div className={styles.badge}>
              DI pharma
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="27" height="27" rx="13.5" fill="#3F3BAE" />
                <path
                  d="M8.00008 12.8889H18.6667M18.6667 12.8889L14.6667 17.7778M18.6667 12.8889L14.6667 8"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.imageCard} ${styles.cardSmall} ${styles.bottomRight}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.badge}>
              Indo continental
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="27" height="27" rx="13.5" fill="#3F3BAE" />
                <path
                  d="M8.00008 12.8889H18.6667M18.6667 12.8889L14.6667 17.7778M18.6667 12.8889L14.6667 8"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
