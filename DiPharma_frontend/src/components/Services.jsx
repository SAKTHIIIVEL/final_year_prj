import React from "react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { useNavigate } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "Diverse Innovation",
    text: "Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare organization committed to delivering comprehensive and accessible medical services to the community.",
  },
  {
    id: 2,
    title: "Diverse Innovation",
    text: "Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare organization committed to delivering comprehensive and accessible medical services to the community.",
  },
  {
    id: 3,
    title: "Diverse Innovation",
    text: "Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare organization committed to delivering comprehensive and accessible medical services to the community.",
  },
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.headTitle}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <p className={styles.description}>
            Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare
            organization committed to delivering comprehensive and accessible
            medical services to the community.
          </p>
        </div>

        <div className={styles.gridWrapper}>
          <svg
            className={styles.backgroundSvg}
            width="316"
            height="389"
            viewBox="0 0 316 389"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M246.688 133.27L193.656 122.342L149.105 171.526L172.739 234.761L225.77 245.69L270.321 196.505L246.688 133.27ZM246.688 133.27L293.657 98.142M60.7278 281.65L160.776 202.747M184.314 320.525L199.255 240.225M175.165 142.745L118.907 59.9464M285.367 304.963L236.819 233.492M298.12 110.518L285.156 74.4951L310.072 46.2783L340.376 52.5231L353.34 88.5459L328.424 116.763L298.12 110.518ZM283.601 357.661L270.638 321.638L295.554 293.421L325.858 299.666L338.821 335.689L313.905 363.906L283.601 357.661ZM78.4166 65.243L65.453 29.2202L90.3693 1.00347L120.673 7.24828L133.637 43.271L108.721 71.4878L78.4166 65.243ZM13.9599 327.109L0.996314 291.086L25.9126 262.869L56.2165 269.114L69.18 305.137L44.2638 333.353L13.9599 327.109ZM157.209 381.642L144.245 345.619L169.162 317.402L199.466 323.647L212.429 359.67L187.513 387.887L157.209 381.642Z"
              stroke="#D9D9D9"
              strokeOpacity="0.15"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className={styles.grid}>
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.number}>{service.id}</div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>{service.text}</p>
                  {/* Reusing text for visual filler as per design */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.viewButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/services");
            }}
          >
            View Services
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Services;
