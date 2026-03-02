import { useEffect, useRef, useState } from "react";
import "./CareerPage.css";
import heroBanner from "../assets/career_banner.png";
import personOne from "../assets/career_person1.png";
import personTwo from "../assets/career_person2.png";
import Swal from "sweetalert2";

const openRoles = [
  {
    title: "Research Assistant - Pharmaceutical Formulations",
    role_focus:
      " Assisting in formulation development, sample testing, documentation.",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
  },
  {
    title: "Research Analyst - Pharmaceutical Formulations",
    role_focus:
      " Assisting in formulation development, sample testing, documentation.",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
  },
  {
    title: "Research Assistant - Pharmaceutical Formulations",
    role_focus:
      " Assisting in formulation development, sample testing, documentation.",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
  },
  {
    title: "Research Assistant - Pharmaceutical Formulations",
    role_focus:
      " Assisting in formulation development, sample testing, documentation.",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
  },
  {
    title: "Research Assistant - Pharmaceutical Formulations",
    role_focus:
      " Assisting in formulation development, sample testing, documentation.",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
  },
];

const CareerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    countryCode: "+91",
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneByCountry = (countryCode, phone) => {
    const cleanPhone = phone.replace(/\D/g, "");

    switch (countryCode) {
      case "+91": // India
        return /^[6-9]\d{9}$/.test(cleanPhone);

      case "+1": // USA / Canada
        return /^\d{10}$/.test(cleanPhone);

      case "+60": // Malaysia
        return /^\d{9,10}$/.test(cleanPhone);

      default:
        return cleanPhone.length >= 8 && cleanPhone.length <= 15;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 5) {
      newErrors.name = "Name must be at least 5 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneByCountry(formData.countryCode, formData.phone)) {
      if (formData.countryCode === "+91") {
        newErrors.phone = "Enter a valid 10-digit Indian mobile number";
      } else if (formData.countryCode === "+1") {
        newErrors.phone = "Enter a valid 10-digit US phone number";
      } else if (formData.countryCode === "+60") {
        newErrors.phone = "Enter a valid Malaysian phone number";
      } else {
        newErrors.phone = "Enter a valid phone number";
      }
    }

    // Role validation
    if (!formData.role.trim()) {
      newErrors.role = "Job position is required";
    } else if (formData.role.trim().length < 6) {
      newErrors.role = "Job position must be at least 6 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // File validation (if file is selected)
    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      const allowedExtensions = [
        ".pdf",
        ".docx",
        ".doc",
        ".jpg",
        ".jpeg",
        ".png",
      ];
      const fileExtension = selectedFile.name
        .substring(selectedFile.name.lastIndexOf("."))
        .toLowerCase();

      if (
        !allowedTypes.includes(selectedFile.type) &&
        !allowedExtensions.includes(fileExtension)
      ) {
        newErrors.upload = "File must be PDF, DOCX, JPG, or PNG";
      } else if (selectedFile.size > 5 * 1024 * 1024) {
        newErrors.upload = "File size must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      // Clear upload error when file is selected
      if (errors.upload) {
        setErrors({ ...errors, upload: "" });
      }
    } else {
      setSelectedFile(null);
      setFileName("No file chosen");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  const data = new FormData();
  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("countryCode", formData.countryCode);
  data.append("role", formData.role);
  data.append("message", formData.message);
  data.append("upload", selectedFile);

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/submit-form`, {
      method: "POST",
      body: data,
    });

    // 🎉 Success popup
    Swal.fire({
      icon: "success",
      title: "Application Submitted!",
      text: "Thank you for applying. Our team will contact you within 24 hours.",
      confirmButtonColor: "#222065",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      message: "",
      countryCode: "+91",
    });
    setSelectedFile(null);
    setFileName("No file chosen");
    setErrors({});
  } catch (error) {
    // ❌ Error popup
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "Something went wrong. Please try again later.",
      confirmButtonColor: "#d33",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const heroRef = useRef(null);
  const positionsRef = useRef(null);
  const portraitRef = useRef(null);
  const contactportraitRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      },
      { threshold: 0.4 },
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            // remove so it replays when scrolling back
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.35 },
    );

    if (positionsRef.current) observer.observe(positionsRef.current);
    if (portraitRef.current) observer.observe(portraitRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            // remove to replay on scroll
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.35 },
    );

    if (contactportraitRef.current)
      observer.observe(contactportraitRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="career-page">
      <section className="career-hero">
        <img src={heroBanner} className="career-hero-image" alt="" />

        <div className="career-hero-gradient"></div>

        <div className="career-hero-content">
          <h2 className="hero-subtitle">GROW WITH A</h2>

          <h1 className="hero-title">
            <span className="purpose-box">PURPOSE</span>
          </h1>
        </div>
      </section>
      <div className="hero-info" ref={heroRef}>
        <p className="hero-sub">Join Us in Shaping the Future of Healthcare</p>
        <p className="hero-description">
          At Dipharmanovation, we are committed to improving lives through
          high-quality pharmaceuticals, medical essentials, and healthcare
          solutions. Our team is growing, and we’re shaping the future of
          healthcare.We’re growing fast and looking for passionate people to
          help us improve lives through high-quality pharmaceuticals, medical
          essentials, and healthcare solutions.
        </p>
      </div>

      <section className="positions-section">
        <div className="positions-content" ref={positionsRef}>
          <div className="positions-text">
            <h2 className="section-title">Open Positions</h2>

            <div className="hero-card">
              <ul
                className="role-list"
                onClick={() => {
                  document.getElementById("career-contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {openRoles.map((role, idx) => (
                  <li key={idx} className="role-item">
                    <div>
                      <p className="role-name">{role.title}</p>
                      <p className="role-meta">{role.role_focus}</p>
                      <p className="role-meta">
                        {role.location} • {role.type}
                      </p>
                    </div>
                    <button className="role-apply">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.9537 2.76827C5.76786 2.77483 5.58261 2.74389 5.40899 2.6773C5.23537 2.61071 5.07694 2.50983 4.94316 2.38069C4.80937 2.25154 4.70297 2.09677 4.63029 1.9256C4.55762 1.75444 4.52017 1.57039 4.52017 1.38444C4.52017 1.19849 4.55762 1.01445 4.63029 0.843284C4.70297 0.672122 4.80937 0.517351 4.94316 0.388204C5.07694 0.259056 5.23537 0.158177 5.40899 0.0915876C5.58261 0.024998 5.76786 -0.00593996 5.9537 0.000619815L16.3977 0.000620299C16.7646 0.000848641 17.1164 0.146718 17.3759 0.406185C17.6354 0.665653 17.7812 1.0175 17.7815 1.38444L17.7815 11.8284C17.788 12.0142 17.7571 12.1995 17.6905 12.3731C17.6239 12.5467 17.523 12.7052 17.3939 12.8389C17.2647 12.9727 17.11 13.0791 16.9388 13.1518C16.7677 13.2245 16.5836 13.2619 16.3977 13.2619C16.2117 13.2619 16.0277 13.2245 15.8565 13.1518C15.6853 13.0791 15.5306 12.9727 15.4014 12.8389C15.2723 12.7052 15.1714 12.5467 15.1048 12.3731C15.0382 12.1995 15.0073 12.0142 15.0138 11.8284L15.0138 4.72651L2.36359 17.3767C2.10391 17.6364 1.75171 17.7823 1.38447 17.7823C1.01723 17.7823 0.665028 17.6364 0.405349 17.3767C0.14567 17.1171 -0.000216123 16.7649 -0.00021646 16.3976C-0.000215786 16.0304 0.145671 15.6782 0.405349 15.4185L13.0556 2.76827L5.9537 2.76827Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-portrait framed" ref={portraitRef}>
            <img src={personOne} alt="Team member" />
          </div>
        </div>
      </section>

      <section className="career-contact-block" id="career-contact">
        <div className="contact-card">
          <div className="contact-portrait" ref={contactportraitRef}>
            <img src={personTwo} alt="Work with us" />
          </div>
          <div className="contact-form-wrapper" ref={formRef}>
            <div className="contact-form-header">
              <p className="contact-kicker">
                Our Team Will Respond to You Within 24 Hours
              </p>
            </div>
            <form className="career-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group-career">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "input-error-career" : ""}
                  />
                  {errors.name && (
                    <span className="error-message-career">{errors.name}</span>
                  )}
                </div>
                <div className="form-group-career">
                  <div className="phone-input-wrapper-career">
                    <div className="select-wrapper-career">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="country-code-select-career"
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
                    <span className="error-message-career">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group-career">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error-career" : ""}
                  />
                  {errors.email && (
                    <span className="error-message-career">{errors.email}</span>
                  )}
                </div>
                <div className="form-group-career">
                  <input
                    type="text"
                    name="role"
                    placeholder="Job Position"
                    value={formData.role}
                    onChange={handleChange}
                    className={errors.role ? "input-error-career" : ""}
                  />
                  {errors.role && (
                    <span className="error-message-career">{errors.role}</span>
                  )}
                </div>
              </div>
              <div className="form-group-career">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "input-error-career" : ""}
                />
                {errors.message && (
                  <span className="error-message-career">{errors.message}</span>
                )}
              </div>
              <div className="form-actions upload-row-career">
                <div className="form-group-career">
                  <label className="file-upload-career">
                    <input
                      type="file"
                      name="upload"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />

                    <span className="upload-btn">
                      <svg
                        className="upload-svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.41667 8.81417V1.60583L3.475 3.5475L2.885 2.94917L5.83333 0L8.7825 2.94917L8.1925 3.54833L6.25 1.60583V8.81417H5.41667ZM1.34667 11.6667C0.962778 11.6667 0.6425 11.5383 0.385833 11.2817C0.129167 11.025 0.000555556 10.7044 0 10.32V8.30083H0.833333V10.32C0.833333 10.4483 0.886667 10.5661 0.993333 10.6733C1.1 10.7806 1.2175 10.8339 1.34583 10.8333H10.3208C10.4486 10.8333 10.5661 10.78 10.6733 10.6733C10.7806 10.5667 10.8339 10.4489 10.8333 10.32V8.30083H11.6667V10.32C11.6667 10.7039 11.5383 11.0242 11.2817 11.2808C11.025 11.5375 10.7044 11.6661 10.32 11.6667H1.34667Z"
                          fill="#222065"
                        />
                      </svg>
                      Upload File
                    </span>
                    <span className="file-text">{fileName}</span>
                  </label>
                  {errors.upload && (
                    <span className="error-message-career">
                      {errors.upload}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="send-btn-career"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              <p className="upload-hint">
                Drag & drop your file here (PDF, DOCX, JPG, PNG) <br />
                Max size: 5MB
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
