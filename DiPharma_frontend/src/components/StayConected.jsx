import React, { useState } from "react";
import styles from "./StayConnected.module.css";
const StayConected = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // ✅ Success
    setError("");
    console.log("Subscribed email:", email);

    // TODO: API call here
  };
  return (
    <div className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Stay Connected For more Insights and Updates</h2>
          <p>
            Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare
            organization committed to delivering comprehensive
          </p>

          <div className={styles.newsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <button className={styles.button} onClick={handleSubscribe}>Subscribe</button>
          </div>
          {error && <h5 className={styles.error}>{error}</h5>}
        </div>
      </div>
    </div>
  );
};

export default StayConected;
