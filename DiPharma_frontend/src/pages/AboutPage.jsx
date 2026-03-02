import "./AboutPage.css";
import aboutTeam1 from "../assets/about/about_team1.jpg";
import aboutLabTubes from "../assets/about/about_lab_tubes.jpg";
import aboutPills from "../assets/about/about_pills.jpg";
import aboutScientist from "../assets/about/about_scientist.jpg";
import aboutShip from "../assets/about/about_ship.jpg";
import aboutTeamCloseup from "../assets/about/scientist.jpg";
import magaeshImage from "../assets/about/managing_director.jpeg";
import seniorManager1 from "../assets/about/director.jpeg";
import seniorManager2 from "../assets/about/general_Manager.jpeg";
import { useEffect, useRef, useState } from "react";
import FlightTimeline from "../components/FlightTimeline";
import sudha from "../assets/about/sudha.jpeg";
import uma from "../assets/about/Uma.jpeg";
import Magesh from "../assets/about/Magesh.jpeg";
import nikhila from "../assets/about/nikhila.jpeg";
import Paulweshly from "../assets/about/PAULWESHLY.jpeg";
import raghul from "../assets/about/raghul.jpeg";
import santhosh from "../assets/about/santhosh.jpeg";
import devika from "../assets/about/devika.jpeg";

const AboutPage = () => {
  const teamMembers = [
    {
      img: magaeshImage,
      name: "Dr. Jefry Wilson",
      role: "Managing Director",
    },
    {
      img: seniorManager1,
      name: "Dr. Arjun",
      role: "Director",
    },
    {
      img: seniorManager2,
      name: "Mr. Kathireswaran",
      role: "General Manager",
    },
    {
      img: sudha,
      name: "Ms. T.Sudha",
      role: "Head Nurse",
    },
    {
      img: uma,
      name: "Ms. Uma Maheswari.G",
      role: "Clinical Pharmacist",
    },
    {
      img: Magesh,
      name: "Mr. Magesh",
      role: "Accountant",
    },
    {
      img: nikhila,
      name: "Ms. Nikhila.L",
      role: "Senior Lab Technician",
    },
    {
      img: Paulweshly,
      name: "Mr. J.Paulweshly",
      role: "Stock Accountent",
    },
    {
      img: raghul,
      name: "Mr. Ragul.G",
      role: "Staff Nurse",
    },
    {
      img: santhosh,
      name: "Mr. C.Santhosh",
      role: "Staff Nurse",
    },
    {
      img: devika,
      name: "Ms. A.Devika",
      role: "Lab Technician",
    },

  ];

  const sectionRef = useRef(null);
  const teamRef = useRef(null);
  const commitmentRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  const trackRef = useRef(null);

  // const CARD_GAP = 28; // same as CSS gap
  // const CARD_WIDTH = 250 + CARD_GAP; // card + gap
  const total = teamMembers.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  /* =========================
     GET CARD WIDTH FROM CSS
  ========================= */
  const getCardWidth = () => {
    const styles = getComputedStyle(document.documentElement);
    const width = parseFloat(styles.getPropertyValue("--team-card-width"));
    const gap = parseFloat(styles.getPropertyValue("--team-card-gap"));
    return width + gap;
  };
 useEffect(() => {
    setCardWidth(getCardWidth());

    const onResize = () => setCardWidth(getCardWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  /* =========================
     SILENT RESET (NO JUMP)
  ========================= */
  useEffect(() => {
    if (currentIndex === total) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);

        requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
        });
      }, 800); // must match transition duration
      return () => clearTimeout(timer);
    }
  }, [currentIndex, total]);

  /* =========================
     TEAM VISIBILITY ANIMATION
  ========================= */
  useEffect(() => {
    if (!teamRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        teamRef.current.classList.toggle("team-visible", entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(teamRef.current);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const isMobile = window.innerWidth < 767;
  //   if (!isMobile || isPaused) return;

  //   const interval = setInterval(() => {
  //     setActiveTeamIndex((prev) => (prev + 1) % 3);
  //   }, 2500);

  //   return () => clearInterval(interval);
  // }, [isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("about-visible");
        } else {
          sectionRef.current.classList.remove("about-visible");
        }
      },
      {
        threshold: 0.3, // triggers when 30% visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  //for team section animation
  useEffect(() => {
    if (!teamRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          teamRef.current.classList.add("team-visible");
        } else {
          teamRef.current.classList.remove("team-visible");
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(teamRef.current);

    return () => observer.disconnect();
  }, []);

  //for commitment section animation
  useEffect(() => {
    if (!commitmentRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          commitmentRef.current.classList.add("commitment-visible");
        } else {
          commitmentRef.current.classList.remove("commitment-visible");
        }
      },
      {
        threshold: 0.3,
      },
    );
    observer.observe(commitmentRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* ABOUT Dipharmainnovation Section */}
      <section className="about-hero-section" ref={sectionRef}>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <p className="about-kicker">ABOUT</p>
            <h1 className="about-title">Dipharmainnovation</h1>
            <p className="about-description">
              Dipharmainnovation is a forward-thinking pharmaceutical and
              healthcare solutions provider committed to improving access to
              quality medical products. With a strong focus on reliability,
              innovation, and customer satisfaction.
            </p>
          </div>
          <div className="about-image-collage">
            <div className="collage-item collage-top-left">
              <img src={aboutTeam1} alt="Medical Professionals" />
            </div>
            <div className="collage-item collage-middle-left">
              <img src={aboutLabTubes} alt="Laboratory Equipment" />
            </div>
            <div className="collage-item collage-top-right">
              <img src={aboutPills} alt="Pharmaceutical Pills" />
            </div>
            <div className="collage-item collage-bottom-right">
              <img src={aboutTeamCloseup} alt="Medical Team" />
            </div>
            <div className="collage-item collage-bottom-left">
              <img src={aboutShip} alt="Cargo Ship" />
            </div>
            <div className="collage-item collage-middle-right">
              <img src={aboutScientist} alt="Scientist with Microscope" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Our Vision Section */}
      <section className="mission-vision-section">
        {/* BACKGROUND ROAD */}
        <FlightTimeline />

        {/* FOREGROUND CONTENT */}
        <div className="mission-vision-container">
          <div className="mission-content" ref={missionRef}>
            <h2>Our Mission</h2>
            <p>
              To enhance the <strong>healthcare ecosystem</strong> by providing{" "}
              <strong>
                safe, high-quality, and affordable medical products
              </strong>{" "}
              that support better patient outcomes and{" "}
              <strong>empower healthcare providers</strong> in their day-to-day
              operations.
            </p>
          </div>

          <div className="vision-content" ref={visionRef}>
            <h2>Our Vision</h2>
            <p>
              To become one of <strong>India’s most trusted names</strong> in
              pharmaceuticals and healthcare supplies by driving innovation,
              strengthening partnerships, and continuously{" "}
              <strong>elevating product standards</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section" ref={teamRef}>
        <div className="team-wrapper">
          {/* LEFT */}
          <div className="team-left">
            <p className="team-label">Our Team</p>
            <h2>Dedicated Minds Driving Healthcare Forward</h2>
          </div>

          {/* RIGHT */}
          <div
            className="team-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
            className="team-track"
            ref={trackRef}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`,
              transition: isTransitionEnabled
                ? "transform 0.8s ease-in-out"
                : "none",
            }}
          >
              {[...teamMembers, ...teamMembers].map((member, index) => {
                const isActive = index % total === activeIndex;

                return (
                  <div
                    key={index}
                    className={`team-card ${isActive ? "active" : ""}`}
                  >
                    <img src={member.img} alt={member.name} />

                    {!isActive && (
                      <span className="vertical-text">{member.role}</span>
                    )}

                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="commitment-section" ref={commitmentRef}>
        <div className="commitment-content">
          <h2 className="commitment-title">Our Commitment</h2>
          <p className="commitment-text">
            At <strong>Dipharmainnovation,</strong> we believe{" "}
            <strong>healthcare is more than a business </strong> - it's a{" "}
            <strong> responsibility</strong>. Our commitment to{" "}
            <strong>excellence</strong> drives us to provide products that
            contribute to a <strong>healthier, safer,</strong> and more{" "}
            <strong>efficient medical environment.</strong>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
