import React, { useEffect, useState } from "react";
import "./IsometricNetwork.css";
const IsometricNetwork = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true); // triggers CSS transition on mount
  }, []);
  return (
    <svg
      width="100%"
      height="500"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft shadow */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        {/* White server gradients */}
        <linearGradient id="whiteTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="whiteLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="whiteRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        {/* Blue server gradients */}
        <linearGradient id="blueTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b5b7f" />
          <stop offset="100%" stopColor="#2d4563" />
        </linearGradient>
        <linearGradient id="blueLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f2847" />
        </linearGradient>
        <linearGradient id="blueRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d4a6e" />
          <stop offset="100%" stopColor="#1e3555" />
        </linearGradient>
      </defs>

      {/* CONNECTION LINES - more refined with gradient */}
      <g
        stroke="#3d5a7d"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      >
        <path d="M600 300 Q560 215 400 150" />
        <path d="M600 300 Q600 210 600 135" />
        <path d="M600 300 Q640 215 800 150" />
        <path d="M600 300 Q740 255 920 210" />
        
        <path d="M600 300 Q700 405 780 400" />
        <path d="M600 300 Q460 360 440 410" />
        <path d="M600 300 Q460 255 280 210" />
      </g>
      {/* CENTER PLATFORM - larger with rounded edges */}

      <g transform="translate(600 300)">
        <g className={`base ${active ? "active" : ""}`}>
          {/* Main platform with rounded corners effect */}
          <path
            d="M-140 10 Q-140 0 -130 -5 L-10 -70 Q0 -75 10 -70 L130 -5 Q140 0 140 10 L140 20 Q140 30 130 35 L10 100 Q0 105 -10 100 L-130 35 Q-140 30 -140 20 Z"
            fill="#2d4663"
          />
          {/* Left side */}
          <polygon points="-140 10 -140 30 -10 100 -10 80" fill="#1a2d47" />
          {/* Right side */}
          <polygon points="140 10 140 30 10 100 10 80" fill="#243852" />
          {/* Grid lines on platform */}
          <g stroke="#1e3a5f" strokeWidth="1.5" opacity="0.4">
            <line x1="-80" y1="-30" x2="-80" y2="50" />
            <line x1="0" y1="-75" x2="0" y2="105" />
            <line x1="80" y1="-30" x2="80" y2="50" />
            <line x1="-100" y1="5" x2="100" y2="5" />
            <line x1="-60" y1="35" x2="60" y2="35" />
          </g>
        </g>
        <g
          className={`building ${active ? "active" : ""}`} transform={`translate(0 20)`}
        >
          <ellipse
            cx="2"
            cy="85"
            rx="50"
            ry="15"
            fill="#0a1628"
            opacity="0.5"
            filter="url(#shadow)"
          />
          {/* TOP - rounded corners */}
          <path
            d="M-38 2 Q-38 0 -36 -1 L-2 -21 Q0 -22 2 -21 L36 -1 Q38 0 38 2 L2 22 Q0 23 -2 22 Z"
            fill={"url(#whiteTop)"}
          />
          {/* LEFT SIDE */}
          <polygon points="-38 2 -38 70 -2 90 -2 22" fill={"url(#whiteLeft)"} />
          {/* RIGHT SIDE */}
          <polygon points="38 2 38 70 2 90 2 22" fill={"url(#whiteRight)"} />
          {/* WINDOWS/VENTS - left side with better spacing */}
          {[0, 1, 2, 3, 4].map((w) => (
            <rect
              key={`l${w}`}
              x="-30"
              y={15 + w * 13}
              width="18"
              height="6"
              rx="1"
              fill={"#a8b5c7"}
              opacity={"0.7"}
            />
          ))}
          {/* WINDOWS/VENTS - right side */}
          {[0, 1, 2, 3, 4].map((w) => (
            <rect
              key={`r${w}`}
              x="12"
              y={15 + w * 13}
              width="18"
              height="6"
              rx="1"
              fill={"#a8b5c7"}
              opacity={"0.7"}
            />
          ))}
        </g>
        
      </g>
      {/* BUILDINGS */}
      {[
        { x: 400, y: 140, type: "blue" },
        { x: 600, y: 125, type: "white" },
        { x: 800, y: 140, type: "blue" },
        { x: 920, y: 200, type: "blue" },
        
        { x: 780, y: 390, type: "white" },
        { x: 440, y: 400, type: "white" },
        { x: 280, y: 200, type: "blue" },
      ].map(({ x, y, type }, i) => {
        const isWhite = type === "white";
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {/* Shadow - darker and more defined */}
            <ellipse
              cx="2"
              cy="85"
              rx="50"
              ry="15"
              fill="#0a1628"
              opacity="0.5"
              filter="url(#shadow)"
            />
            {/* TOP - rounded corners */}
            <path
              d="M-38 2 Q-38 0 -36 -1 L-2 -21 Q0 -22 2 -21 L36 -1 Q38 0 38 2 L2 22 Q0 23 -2 22 Z"
              fill={isWhite ? "url(#whiteTop)" : "url(#blueTop)"}
            />
            {/* LEFT SIDE */}
            <polygon
              points="-38 2 -38 70 -2 90 -2 22"
              fill={isWhite ? "url(#whiteLeft)" : "url(#blueLeft)"}
            />
            {/* RIGHT SIDE */}
            <polygon
              points="38 2 38 70 2 90 2 22"
              fill={isWhite ? "url(#whiteRight)" : "url(#blueRight)"}
            />
            {/* WINDOWS/VENTS - left side with better spacing */}
            {[0, 1, 2, 3, 4].map((w) => (
              <rect
                key={`l${w}`}
                x="-30"
                y={15 + w * 13}
                width="18"
                height="6"
                rx="1"
                fill={isWhite ? "#a8b5c7" : "#5ba3f5"}
                opacity={isWhite ? "0.7" : "0.85"}
              />
            ))}
            {/* WINDOWS/VENTS - right side */}
            {[0, 1, 2, 3, 4].map((w) => (
              <rect
                key={`r${w}`}
                x="12"
                y={15 + w * 13}
                width="18"
                height="6"
                rx="1"
                fill={isWhite ? "#a8b5c7" : "#5ba3f5"}
                opacity={isWhite ? "0.7" : "0.85"}
              />
            ))}
          </g>
        );
      })}
      {/* COMPANY LABELS */}
      <g fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
        <rect
          x="180"
          y="125"
          rx="12"
          ry="12"
          width="140"
          height="40"
          fill="#ffffff"
        />
        <text x="250" y="152" fontSize="18" fill="#1e293b" textAnchor="middle">
          Company 1
        </text>
        <rect
          x="880"
          y="125"
          rx="12"
          ry="12"
          width="140"
          height="40"
          fill="#ffffff"
        />
        <text x="950" y="152" fontSize="18" fill="#1e293b" textAnchor="middle">
          Company 1
        </text>
      </g>
    </svg>
  );
};

export default IsometricNetwork;
