import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../store/api";
import "./ProductsPage.css";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop&q=80";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const ProductsPage = () => {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.data || [];
  const navigate = useNavigate();

  const handleContactUs = (title) => {
    navigate(
      `/contact?subject=${encodeURIComponent(`Request Product: ${title}`)}`,
    );
  };

  return (
    <div className="pp-page">
      {/* Hero */}
      <section className="pp-hero">
        <div className="pp-hero-glow" />
        <motion.div
          className="pp-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="pp-kicker">What We Offer</span>
          <h1>Our Products</h1>
          <p>
            Comprehensive healthcare solutions tailored for your needs — from
            polyclinics to home care, we've got you covered.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="pp-products">
        <div className="pp-container">
          {isLoading ? (
            <div className="pp-loading">
              <div className="pp-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <p className="pp-empty">No products available yet.</p>
          ) : (
            <div className="pp-grid">
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  className="pp-card"
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <div className="pp-card-img-wrap">
                    <img
                      src={product.image || PLACEHOLDER_IMG}
                      alt={product.title}
                      className="pp-card-img"
                    />
                    <div className="pp-card-overlay" />
                    <span className="pp-card-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pp-card-body">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <motion.button
                      className="pp-contact-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleContactUs(product.title)}
                    >
                      Contact Us →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
