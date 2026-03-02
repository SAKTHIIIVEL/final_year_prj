import React, { useEffect, useState } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [activeConnection, setActiveConnection] = useState(0);
  const [hoveredServer, setHoveredServer] = useState(null);

  const servers = [
    { id: 0, color: "#E8EDF5", x: 250, y: 200, w: 60, h: 80, d: 40, platform: true },
    { id: 1, color: "#2D5AA0", x: 100, y: 100, w: 50, h: 70, d: 35 },
    { id: 2, color: "#2D5AA0", x: 400, y: 100, w: 50, h: 70, d: 35 },
    { id: 3, color: "#2D5AA0", x: 100, y: 300, w: 50, h: 70, d: 35 },
    { id: 4, color: "#2D5AA0", x: 400, y: 300, w: 50, h: 70, d: 35 },
    { id: 5, color: "#E8EDF5", x: 50, y: 200, w: 45, h: 65, d: 30 },
    { id: 6, color: "#E8EDF5", x: 450, y: 200, w: 45, h: 65, d: 30 }
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 0, to: 6 },
    { from: 1, to: 2 },
    { from: 3, to: 4 }
  ];

  useEffect(() => {
    if (hoveredServer !== null) return;

    const interval = setInterval(() => {
      setActiveConnection((p) => (p + 1) % connections.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [hoveredServer]);

  const renderServer = (s) => {
    const isRaised =
      hoveredServer === s.id ||
      connections[activeConnection]?.from === s.id ||
      connections[activeConnection]?.to === s.id;

    const rise = isRaised ? -10 : 0;

    return (
      <g
        key={s.id}
        className="server"
        transform={`translate(0 ${rise})`}
        onMouseEnter={() => setHoveredServer(s.id)}
        onMouseLeave={() => setHoveredServer(null)}
      >
        {/* Shadow */}
        <ellipse
          cx={s.x + s.w / 2}
          cy={s.y + s.h + 18}
          rx={s.w * 0.6}
          ry={s.d * 0.4}
          className="shadow"
        />

        {/* Platform */}
        {s.platform && (
          <>
            <path
              d={`M ${s.x - 40} ${s.y + s.h - 10}
                  L ${s.x + s.w + 40} ${s.y + s.h - 10}
                  L ${s.x + s.w + 60} ${s.y + s.h + 10}
                  L ${s.x - 20} ${s.y + s.h + 10} Z`}
              fill="#2D5AA0"
            />
            <path
              d={`M ${s.x + s.w + 40} ${s.y + s.h - 10}
                  L ${s.x + s.w + 60} ${s.y + s.h + 10}
                  L ${s.x + s.w + 60} ${s.y + s.h + 25}
                  L ${s.x + s.w + 40} ${s.y + s.h + 15} Z`}
              fill="#1a3a6b"
            />
          </>
        )}

        {/* Front */}
        <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.color} />

        {/* Grid */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={s.x + 5}
            x2={s.x + s.w - 5}
            y1={s.y + 12 + i * 12}
            y2={s.y + 12 + i * 12}
            stroke={s.color === "#E8EDF5" ? "#b8bfc7" : "#4a7bc8"}
            strokeWidth="1"
          />
        ))}

        {/* Top */}
        <path
          d={`M ${s.x} ${s.y}
              L ${s.x + s.w} ${s.y}
              L ${s.x + s.w + s.d * 0.5} ${s.y - s.d * 0.5}
              L ${s.x + s.d * 0.5} ${s.y - s.d * 0.5} Z`}
          fill={s.color === "#E8EDF5" ? "#f5f7fa" : "#4a7bc8"}
        />

        {/* Right */}
        <path
          d={`M ${s.x + s.w} ${s.y}
              L ${s.x + s.w + s.d * 0.5} ${s.y - s.d * 0.5}
              L ${s.x + s.w + s.d * 0.5} ${s.y + s.h - s.d * 0.5}
              L ${s.x + s.w} ${s.y + s.h} Z`}
          fill={s.color === "#E8EDF5" ? "#dce1e8" : "#2a4a7a"}
        />

        {/* Status light */}
        {/* <circle
          cx={s.x + s.w - 10}
          cy={s.y + 14}
          r="3"
          className="status"
        /> */}
      </g>
    );
  };

  return (
    <div className="iso-container">
      <svg  viewBox="0 0 550 450" >
        <defs>
          <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D5AA0" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>

        {connections.map((c, i) => {
          const a = servers[c.from];
          const b = servers[c.to];
          const active =
            hoveredServer !== null
              ? c.from === hoveredServer || c.to === hoveredServer
              : i === activeConnection;

          return (
            <line
              key={i}
              x1={a.x + a.w / 2}
              y1={a.y + a.h / 2}
              x2={b.x + b.w / 2}
              y2={b.y + b.h / 2}
              className={`connection ${active ? "active" : ""}`}
              stroke="url(#flow)"
            />
          );
        })}

        {servers.map(renderServer)}
      </svg>
    </div>
  );
};

export default HeroSection;
