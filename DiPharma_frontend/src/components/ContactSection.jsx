import { useEffect, useRef, useState } from "react";
import "./ContactSection.css";
import Swal from "sweetalert2";

const COUNTRY_RULES = {
  "+91": { name: "India", min: 10, max: 10 },
  "+60": { name: "Malaysia", min: 9, max: 10 },
  "+1": { name: "USA", min: 10, max: 10 },
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    countryCode: "+91",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow ONLY numbers for phone field
    if (name === "phone") {
      // Remove non-numeric characters
      const numericValue = value.replace(/[^0-9]/g, "");

      setFormData({
        ...formData,
        phone: numericValue,
      });

      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    // Default behavior for other fields
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email.trim()))
      newErrors.email = "Enter a valid email";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const rules = COUNTRY_RULES[formData.countryCode];

    if (!phoneDigits) {
      newErrors.phone = "Phone number is required";
    } else if (
      phoneDigits.length < rules.min ||
      phoneDigits.length > rules.max
    ) {
      newErrors.phone = `Enter a valid ${rules.name} number (${rules.min}-${rules.max} digits)`;
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log("Form submitted:", formData);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
         Swal.fire({
              icon: "success",
              title: "Contact Submitted!",
              text: "Thank you for Contacting. Our team will contact you within 24 hours.",
              confirmButtonColor: "#222065",
            });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
         Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: "Something went wrong. Please try again later.",
              confirmButtonColor: "#d33",
            });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: "Something went wrong. Please try again later.",
              confirmButtonColor: "#d33",
            });
    }finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show"); // replay on scroll
          }
        });
      },
      { threshold: 0.3 }
    );

    if (infoRef.current) observer.observe(infoRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <div className="contact-info-panel" ref={infoRef}>
          <div className="info-item">
            <h3 className="info-label">Contact</h3>
            <p className="info-value">+91-9677787817</p>
          </div>

          <div className="info-item">
            <h3 className="info-label">Address</h3>
            <p className="info-value">
              No.18, Velan Avenue, Rice Mill Road, Kandigai, Chennai – 600127
            </p>
          </div>

          <div className="info-item">
            <h3 className="info-label">Open Time</h3>
            <div className="info-value">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="info-item">
            <h3 className="info-label">Stay Connected</h3>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.8337 18.9998C34.8337 10.2598 27.7403 3.1665 19.0003 3.1665C10.2603 3.1665 3.16699 10.2598 3.16699 18.9998C3.16699 26.6632 8.61366 33.044 15.8337 34.5165V23.7498H12.667V18.9998H15.8337V15.0415C15.8337 11.9857 18.3195 9.49984 21.3753 9.49984H25.3337V14.2498H22.167C21.2962 14.2498 20.5837 14.9623 20.5837 15.8332V18.9998H25.3337V23.7498H20.5837V34.754C28.5795 33.9623 34.8337 27.2173 34.8337 18.9998Z"
                    fill="#222065"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="WhatsApp">
                <svg
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5017 3.0835C27.0163 3.0835 33.9183 9.98554 33.9183 18.5002C33.9183 27.0148 27.0163 33.9168 18.5017 33.9168C15.7771 33.9215 13.1005 33.2005 10.7471 31.8279L3.09115 33.9168L5.17548 26.2578C3.8018 23.9036 3.08021 21.2259 3.08498 18.5002C3.08498 9.98554 9.98703 3.0835 18.5017 3.0835ZM13.2477 11.2543L12.9393 11.2667C12.74 11.2804 12.5452 11.3328 12.3658 11.4208C12.1987 11.5157 12.046 11.634 11.9126 11.7723C11.7276 11.9465 11.6227 12.0976 11.5102 12.2441C10.94 12.9855 10.6329 13.8957 10.6376 14.831C10.6407 15.5864 10.838 16.3218 11.1464 17.0094C11.7769 18.4 12.8144 19.8722 14.1834 21.2366C14.5134 21.565 14.8371 21.8949 15.1855 22.2017C16.8867 23.6993 18.9137 24.7793 21.1055 25.356L21.9812 25.4901C22.2664 25.5055 22.5516 25.4839 22.8384 25.47C23.2873 25.4464 23.7256 25.3248 24.1226 25.1139C24.3243 25.0096 24.5213 24.8964 24.713 24.7747C24.713 24.7747 24.7783 24.7306 24.9057 24.636C25.1139 24.4818 25.2418 24.3724 25.4145 24.192C25.544 24.0584 25.6519 23.9032 25.7382 23.7264C25.8585 23.4751 25.9787 22.9957 26.0281 22.5964C26.0651 22.2911 26.0543 22.1246 26.0497 22.0213C26.0435 21.8564 25.9063 21.6852 25.7567 21.6128L24.8595 21.2104C24.8595 21.2104 23.5182 20.6261 22.6981 20.253C22.6122 20.2157 22.5203 20.1942 22.4267 20.1898C22.3212 20.1788 22.2146 20.1906 22.1141 20.2243C22.0135 20.2581 21.9214 20.3131 21.844 20.3856C21.8363 20.3825 21.733 20.4704 20.6184 21.8209C20.5544 21.9069 20.4663 21.9718 20.3652 22.0075C20.2642 22.0432 20.1548 22.048 20.051 22.0213C19.9506 21.9946 19.8521 21.9605 19.7566 21.9196C19.5654 21.8394 19.4991 21.8086 19.3681 21.7531C18.483 21.3675 17.6637 20.8458 16.9399 20.2068C16.7457 20.0372 16.5653 19.8522 16.3803 19.6734C15.7738 19.0925 15.2453 18.4354 14.8078 17.7185L14.7169 17.5721C14.6525 17.4731 14.5998 17.3671 14.5596 17.256C14.501 17.0294 14.6537 16.8475 14.6537 16.8475C14.6537 16.8475 15.0283 16.4374 15.2025 16.2154C15.3721 15.9996 15.5154 15.7899 15.6079 15.6404C15.7899 15.3475 15.8469 15.0468 15.7513 14.814C15.3197 13.7595 14.8736 12.7107 14.4132 11.6675C14.3222 11.4609 14.0524 11.3129 13.8073 11.2836C13.724 11.2733 13.6408 11.2651 13.5575 11.259C13.3505 11.2471 13.143 11.2491 12.9362 11.2651L13.2477 11.2543Z"
                    fill="#222065"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Linkedin">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.5952 10.262V12.2418C15.0098 11.6103 15.5813 11.0972 16.2537 10.7528C16.9261 10.4084 17.6764 10.2445 18.4312 10.2772C22.462 10.2772 23.3335 12.7972 23.3335 16.0755V22.75H19.6002V16.8327C19.6002 15.421 19.3155 13.6057 17.1175 13.6057C14.986 13.6057 14.622 15.1422 14.622 16.7277V22.75H10.9004V10.262H14.5952ZM8.4002 7.12367C8.39974 7.4935 8.29011 7.85497 8.08506 8.16276C7.88001 8.47055 7.58866 8.71095 7.24753 8.85383C6.90655 8.99556 6.53111 9.03264 6.16899 8.96034C5.80687 8.88804 5.47445 8.70963 5.21403 8.44783C4.95313 8.18587 4.7755 7.85261 4.70349 7.48996C4.63148 7.12731 4.6683 6.75147 4.80933 6.4097C4.95035 6.06792 5.18928 5.77547 5.49607 5.56913C5.80286 5.36278 6.16381 5.25175 6.53353 5.25C6.77926 5.25 7.02256 5.29851 7.2495 5.39276C7.47643 5.487 7.68252 5.62513 7.85595 5.79921C8.02937 5.97328 8.16673 6.17989 8.26012 6.40717C8.35352 6.63446 8.40112 6.87794 8.4002 7.12367Z"
                    fill="#222065"
                  />
                  <path
                    d="M8.4 10.2771H4.66666V22.7499H8.4V10.2771Z"
                    fill="#222065"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0003 11.6665C14.8511 11.6665 13.7489 12.1231 12.9362 12.9357C12.1235 13.7484 11.667 14.8506 11.667 15.9998C11.667 17.1491 12.1235 18.2513 12.9362 19.064C13.7489 19.8766 14.8511 20.3332 16.0003 20.3332C17.1496 20.3332 18.2518 19.8766 19.0645 19.064C19.8771 18.2513 20.3337 17.1491 20.3337 15.9998C20.3337 14.8506 19.8771 13.7484 19.0645 12.9357C18.2518 12.1231 17.1496 11.6665 16.0003 11.6665Z"
                    fill="#222065"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.02682 4.10919C13.6615 3.59576 18.3388 3.59576 22.9735 4.10919C25.5055 4.39186 27.5468 6.38519 27.8442 8.92653C28.3934 13.6261 28.3934 18.3736 27.8442 23.0732C27.5468 25.6145 25.5055 27.6079 22.9748 27.8919C18.3397 28.4054 13.662 28.4054 9.02682 27.8919C6.49482 27.6079 4.45349 25.6145 4.15616 23.0745C3.6068 18.3745 3.6068 13.6265 4.15616 8.92653C4.45349 6.38519 6.49482 4.39186 9.02682 4.10919ZM22.6668 7.99986C22.3132 7.99986 21.9741 8.14034 21.724 8.39038C21.474 8.64043 21.3335 8.97957 21.3335 9.33319C21.3335 9.68681 21.474 10.026 21.724 10.276C21.9741 10.526 22.3132 10.6665 22.6668 10.6665C23.0204 10.6665 23.3596 10.526 23.6096 10.276C23.8597 10.026 24.0002 9.68681 24.0002 9.33319C24.0002 8.97957 23.8597 8.64043 23.6096 8.39038C23.3596 8.14034 23.0204 7.99986 22.6668 7.99986ZM9.66682 15.9999C9.66682 14.3202 10.3341 12.7092 11.5218 11.5215C12.7095 10.3338 14.3205 9.66653 16.0002 9.66653C17.6799 9.66653 19.2908 10.3338 20.4785 11.5215C21.6662 12.7092 22.3335 14.3202 22.3335 15.9999C22.3335 17.6796 21.6662 19.2905 20.4785 20.4782C19.2908 21.6659 17.6799 22.3332 16.0002 22.3332C14.3205 22.3332 12.7095 21.6659 11.5218 20.4782C10.3341 19.2905 9.66682 17.6796 9.66682 15.9999Z"
                    fill="#222065"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Email">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.51378 27C3.79719 27 3.19933 26.758 2.72022 26.274C2.24111 25.79 2.00104 25.1855 2 24.4606V7.53943C2 6.81552 2.24007 6.21157 2.72022 5.72757C3.20037 5.24357 3.7977 5.00105 4.51222 5H27.4878C28.2033 5 28.8007 5.24252 29.2798 5.72757C29.7589 6.21262 29.999 6.81657 30 7.53943V24.4621C30 25.185 29.7599 25.7889 29.2798 26.274C28.7996 26.759 28.2023 27.001 27.4878 27H4.51378ZM16 15.9371C16.1296 15.9371 16.251 15.9172 16.364 15.8774C16.476 15.8376 16.587 15.7889 16.6969 15.7313L27.942 8.29371C28.0893 8.20362 28.1852 8.08052 28.2298 7.92443C28.2744 7.76833 28.2661 7.61276 28.2049 7.45771C28.1655 7.25552 28.0348 7.10886 27.8129 7.01771C27.592 6.92762 27.3779 6.94595 27.1704 7.07271L16 14.4286L4.83111 7.07429C4.6237 6.94648 4.41422 6.91924 4.20267 6.99257C3.99111 7.0659 3.85526 7.21048 3.79511 7.42629C3.73496 7.58762 3.72719 7.75157 3.77178 7.91814C3.81637 8.08471 3.91178 8.21043 4.058 8.29529L15.3031 15.7313C15.413 15.7889 15.524 15.8376 15.636 15.8774C15.749 15.9162 15.8704 15.9356 16 15.9356"
                    fill="#222065"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-panel" ref={formRef}>
          <h2 className="form-title">Let's Get In Touch</h2>
          <p className="form-subtitle">
            Let us know your concern, and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <span className="input-error">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <span className="input-error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <span className="input-error">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <div className="phone-input-wrapper">
                  <div className="select-wrapper">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="country-code-select"
                    >
                      <option value="+91">+91</option>
                      <option value="+60">+60</option>
                      <option value="+1">+1</option>
                    </select>
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder=" Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>

                {errors.phone && (
                  <span className="input-error">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && (
                <span className="input-error">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && (
                <span className="input-error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="send-message-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
