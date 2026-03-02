import React from "react";
import "./NetworkDiagram.css";

import white from "../../assets/icons/white.png";
import blue from "../../assets/icons/blue.png";

export default function NetworkDiagram() {
  return (
    <div className="diagram-wrapper">
      <div className="diagram">
        {/* CONNECTIONS */}
        <svg className="connections" viewBox="0 0 700 510">
          {/* center to LEFT TOP BLUE */}
          <path className="base-line" d="M220 120 L340 200 L380 200" />
          <path className="flow center-out" d="M220 120 L340 200 L380 200" />

          {/* center to BOTTOM LEFT WHITE */}
          <path className="base-line" d="M240 330 L390 200" />
          <path className="flow center-out" d="M240 330 L390 200" />

          {/* center to BOTTOM RIGHT WHITE */}
          <path className="base-line" d="M510 320 L390 230" />
          <path className="flow center-out" d="M510 320 L390 230" />

          {/* LEFT Top BLUE to center white */}
          <path className="base-line" d="M500 120 L390 200" />
          <path className="flow center-out" d="M500 120 L390 200" />

          {/* Right top BLUE to bottom blue */}
          <path className="base-line" d="M500 120 L620 220" />
          <path className="flow relay" d="M500 120 L620 220" />

          {/* LEFT bottom white to left blue */}
          <path className="base-line" d="M210 360 L45 230" />
          <path className="flow relay" d="M210 360 L45 230" />
          {/* LEFT bottom blue to left top blue */}
          <path className="base-line" d="M80 230 L220 120" />
          <path className="flow relay" d="M80 230 L220 120" />
          {/* right top blue to left top blue */}
          <path className="base-line" d="M220 120 L360 10 L500 120" />
          <path className="flow relay" d="M220 120 L360 10 L500 120" />

          {/* LEFT bottom white to right white */}
          <path className="base-line" d="M190 360 L350 460 L480 360" />
          <path className="flow relay" d="M190 360 L350 460 L480 360" />
          {/*right bottom white to right blue */}
          <path className="base-line" d="M530 310 L650 220" />
          <path className="flow relay" d="M530 310 L650 220" />
        </svg>

        {/* BLUE BUILDINGS */}
        <div className="server-wrap lt">
          <img src={blue} className="server blue" alt="" />
          <button className="server-btn">
            <span className="btn-text">Dr.Will</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        <div className="server-wrap rt">
          <img src={blue} className="server blue" alt="" />
          <button className="server-btn">
            <span className="btn-text">Di Research</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        <div className="server-wrap lb">
          <img src={blue} className="server blue" alt="" />
          <button className="server-btn">
            <span className="btn-text">Di WholeSale</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        <div className="server-wrap rb">
          <img src={blue} className="server blue" alt="" />
          <button className="server-btn">
            <span className="btn-text">MJ 7</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        {/* WHITE BUILDINGS */}
        <div className="server-wrap wl">
          <img src={white} className="server white" alt="" />
          <button className="server-btn">
            <span className="btn-text">Indo Continental 7</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        <div className="server-wrap wr">
          <img src={white} className="server white" alt="" />
          <button className="server-btn">
            <span className="btn-text">Grandis7</span>
            <span className="btn-arrow">
              <svg width="26" height="18" viewBox="0 0 66 43">
                <g fill="none">
                  <path
                    className="one"
                    d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                    fill="#000"
                  />
                  <path
                    className="two"
                    d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                    fill="#000"
                  />
                  <path
                    className="three"
                    d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                    fill="#000"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        {/* CENTER */}
        <div className="center-group">
          <div className="center-base"></div>

          <div className="server-wrap center">
            <img src={white} className="server white" alt="" />
            <button className="server-btn">
              <span className="btn-text">DI Pharma</span>
              <span className="btn-arrow">
                <svg width="26" height="18" viewBox="0 0 66 43">
                  <g fill="none">
                    <path
                      className="one"
                      d="M40.15 3.89L44 0.14 65.7 20.78 44 42.86 40.15 39.1 57 21.85z"
                      fill="#000"
                    />
                    <path
                      className="two"
                      d="M20.15 3.89L24 0.14 45.7 20.78 24 42.86 20.15 39.1 37 21.85z"
                      fill="#000"
                    />
                    <path
                      className="three"
                      d="M0.15 3.89L4 0.14 25.7 20.78 4 42.86 0.15 39.1 17 21.85z"
                      fill="#000"
                    />
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
