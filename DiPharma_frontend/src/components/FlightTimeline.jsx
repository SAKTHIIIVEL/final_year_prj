import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./FlightTimeline.css";

gsap.registerPlugin(MotionPathPlugin);

const pins = [
  {
    year: "2012",
    title: "Di Pharma",
    align: "left",
    position: 0.92,
  },
  {
    year: "2014",
    title: "IndoContinental 7",
    align: "right",
    position: 0.82,
  },
  {
    year: "2017",
    title: "MJ7",
    align: "left",
    position: 0.71,
  },
  {
    year: "2025",
    title: "Di polyclinic",
    align: "right",
    position: 0.61,
  },
  {
    year: "2025",
    title: "Di Wholesale",
    align: "left",
    position: 0.50,
  },
  {
    year: "2025",
    title: "Di Laboratories",
    align: "right",
    position: 0.40,
  },
  {
    year: "coming soon",
    title: "Dr. Will",
    align: "right",
    position: 0.26,
  },
  {
    year: "coming soon",
    title: "Di Research",
    align: "right",
    position: 0.16,
  },
  {
    year: "coming soon",
    title: "Grandis 7",
    align: "right",
    position: 0.07,
  },
];

/* =======================
   ROAD PIN COMPONENT
======================= */
function RoadPin({ refProp, year, title }) {
  // const LABEL_PADDING = 14;
  const groupRef = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(120);

  const PADDING_X = 16;
  // const PADDING_Y = 14;

  useEffect(() => {
    if (titleRef.current && yearRef.current) {
      const titleWidth = titleRef.current.getBBox().width;
      const yearWidth = yearRef.current.getBBox().width;

      const maxTextWidth = Math.max(titleWidth, yearWidth);

      const extraWidth = title === "MJ7" ? 38 : 0;
      setBoxWidth(maxTextWidth + PADDING_X * 2 + extraWidth);
    }
  }, [title, year]);

  return (
    <g ref={(el) => {
        refProp(el);
        groupRef.current = el;
      }}
      opacity="0.35"
    >
      {/* PIN ICON */}
      <path
        d="M12 2C7 2 3 6 3 11c0 7 9 15 9 15s9-8 9-15c0-5-4-9-9-9z"
        fill="#D7D7ED"
      />
      <circle cx="12" cy="11" r="4" fill="#2a3170" />

      {/* LABEL BELOW PIN */}
      <g
  transform={`translate(${12 - boxWidth / 2}, 38)`}
>
  <rect
    width={boxWidth}
    height={title === "MJ7" ? 60 : 54}
    rx="10"
    fill="#D7D7ED"
  />

  <text
    ref={yearRef}
    x={PADDING_X}
    y={title === "MJ7" ? 26 : 22}
    fontSize="11"
    fontWeight="600"
  >
    {year}
  </text>

  <text
    ref={titleRef}
    x={PADDING_X}
    y={title === "MJ7" ? 46 : 40}
    fontSize="12"
  >
    {title}
  </text>
</g>
    </g>
  );
}

/* =======================
   PIN ACTIVE / INACTIVE
======================= */
const activatePin = (pin, active) => {
  gsap.to(pin, {
    opacity: active ? 1 : 0.35,
    scale: active ? 1.08 : 1,
    filter: active ? "none" : "none",
    transformOrigin: "center",
    duration: 0.3,
  });
};

/* =======================
   MAIN COMPONENT
======================= */
export default function FlightTimeline() {
  const planeRef = useRef(null);
  const pinRefs = useRef([]);
  pinRefs.current = [];
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const setPinRef = (el) => {
    if (el && !pinRefs.current.includes(el)) {
      pinRefs.current.push(el);
    }
  };

  const DESKTOP_PATH =
  "M -10 400 C 300 450, 550 100, 800 8 S 1000 -40, 1450 -40";

const MOBILE_PATH =
  "M -10 600 C 300 590, 550 200, 690 10 S 1000 -90, 1250 -170";

  const DESKTOP_DASH_PATH =
    "M 0 400 C 300 450, 550 100, 800 10 S 1000 -40, 1450 -40";
  const MOBILE_DASH_PATH =
    "M 0 600 C 300 590, 550 200, 690 10 S 1000 -90, 1250 -170";

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const onResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return isMobile;
  }

  useEffect(() => {
  if (!planeRef.current || !pinRefs.current.length) return;

  // =========================
  // PLACE PINS ON PATH
  // =========================
  pins.forEach((pin, index) => {
    gsap.set(pinRefs.current[index], {
      motionPath: {
        path: "#road-path",
        align: "#road-path",
        alignOrigin: [0.5, 0.15],
        start: pin.position,
        end: pin.position,
      },
    });

    // ensure all start inactive
    activatePin(pinRefs.current[index], false);
  });

  const FLIGHT_START = 1;
  const FLIGHT_END = 0.3;
  const TOTAL_DURATION = 6;

  // Track activation state (cleaner than dataset)
  let activatedPins = new Array(pins.length).fill(false);

  const tl = gsap.timeline({ paused: true });

  tl.to(planeRef.current, {
    duration: TOTAL_DURATION,
    ease: "power2.inOut",
    motionPath: {
      path: "#road-path",
      align: "#road-path",
      autoRotate: -130,
      alignOrigin: [0.5, 0.5],
      start: FLIGHT_START,
      end: FLIGHT_END,
    },
    onUpdate: function () {
  const planeX = planeRef.current.getCTM().e;

  pins.forEach((pin, index) => {
    const pinX = pinRefs.current[index].getCTM().e;

    // Since plane moves right → left
    if (!activatedPins[index] && planeX <= pinX) {
      activatePin(pinRefs.current[index], true);
      activatedPins[index] = true;
    }
  });
},
  });

  timelineRef.current = tl;

  // =========================
  // INTERSECTION OBSERVER
  // =========================
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        tl.restart();
      } else {
        tl.pause(0);

        // Reset all pins when leaving section
        activatedPins.fill(false);

        pinRefs.current.forEach((pinEl) => {
          activatePin(pinEl, false);
        });
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);


  const isMobile = useIsMobile();
  const path = isMobile ? MOBILE_PATH : DESKTOP_PATH;
  return (
    <div className="flight-svg" ref={sectionRef}>
      <svg viewBox="0 0 1400 300" width="100%" height="100%">
        {/* ROAD GLOW */}
        <path d={path} stroke="#2a3170" strokeWidth="80" fill="none" />

        {/* ROAD BASE */}
        <path d={path} stroke="#202365" strokeWidth="70" fill="none" />

        {/* CENTER DASH */}
        <path
          id="road-path"
          d={isMobile ? MOBILE_DASH_PATH : DESKTOP_DASH_PATH}
          stroke="#9fa7d8"
          strokeWidth="4"
          strokeDasharray="14 14"
          fill="none"
        />

        {/* PINS */}
        {pins.map((pin, index) => (
          <RoadPin
            key={index}
            refProp={setPinRef}
            year={pin.year}
            title={pin.title}
            align={pin.align}
          />
        ))}

        {/* PLANE */}
        <g ref={planeRef}>
          <svg width="56" height="56" viewBox="0 0 67 64" fill="none">
            <path
              d="M9.42954 3.59867L4.72086 8.38223L11.8028 41.9504L1.86363 52.0477C0.545617 53.3866 -0.11858 55.1351 0.0171533 56.9083C0.152887 58.6815 1.07743 60.3343 2.58741 61.5031C4.09738 62.6718 6.06908 63.2608 8.06877 63.1405C10.0685 63.0201 11.9323 62.2003 13.2504 60.8613L23.4504 50.499L61.9153 52.1852L66.3606 47.6692L36.6049 37.1353L48.0375 25.521L61.5471 27.0826L66.5167 22.034L47.3137 16.0656L38.0499 0L33.0803 5.04856L36.6508 16.7074L25.0095 28.5338L9.42954 3.59867Z"
              fill="#ffffff"
            />
          </svg>
        </g>
      </svg>
    </div>
  );
}
