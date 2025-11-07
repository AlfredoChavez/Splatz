import { useState, useEffect } from 'react';
// https://www.cssscript.com/creative-animated-toggle-switch/
//* Created this plain HTML and CSS into a React component with help of AI for styling
//! The original version used webkit for transitions for example
function DarkModeToggle({ scale = 3 }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <div>
      <style>{`
        :root {
          // --dark: #111111;
          --sun: #ffd700;
          --sun-shadow: #987416;
          --moon: #dddddd;
          --moon-shadow: #808080;
          --star: #ffffff;
          --cloud: #ffffff;
          --crater: #535370;
          --shadow-01: #80808077;
          --shadow-02: #ffffff22;
          --shadow-03: #555555;
          // --white: #ffffff;
          --background-day: linear-gradient(#dfeaeb, cadetblue);
          // --background-day: linear-gradient(skyblue, cadetblue);
          --background-night: linear-gradient(-45deg, #222, #111111);
          // --background-night: linear-gradient(-45deg, #222, #000030);
        }

        .toggle-container {
          position: relative;
          display: inline-block;
          width: 80px;
          height: 34px;
          transform: scale(${scale});
        }

        .toggle-container input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: var(--background-day);
          // box-shadow: inset 0 0 3px;
          transition: 0.4s;
          filter: drop-shadow(0 0 2px var(--dark));
          overflow: hidden;
          z-index: 1;
          border-radius: 34px;
          border: 2px solid white;
        }

        .toggle-slider::before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: var(--sun);
          transition: 0.4s;
          box-shadow:
            inset 0 -1px 2px var(--sun-shadow),
            0 1px 2px var(--shadow-01),
            0 0 0 10px var(--shadow-02),
            0 0 0 20px var(--shadow-02),
            10px 0 0 20px var(--shadow-02);
          border-radius: 50%;
        }

        .toggle-container input:checked + .toggle-slider {
          background: var(--background-night);
          filter: drop-shadow(0 0 2px var(--white));
          border: 2px solid var(--moon-shadow);
        }

        .toggle-container input:checked + .toggle-slider::before {
          background: var(--moon);
          transform: translateX(180%);
          box-shadow:
            inset 0 -1px 2px var(--moon-shadow),
            0 1px 2px var(--shadow-03),
            0 0 0 10px var(--shadow-02),
            0 0 0 20px var(--shadow-02),
            -10px 0 0 20px var(--shadow-02);
        }

        .toggle-slider::after {
          content: "";
          position: absolute;
          background: var(--crater);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          bottom: 65%;
          right: 16%;
          box-shadow:
            -8px 7px 0 3px var(--crater),
            2px 10px 0 var(--crater);
          transition: 0.4s;
          transform: scale(0) rotate(360deg);
          filter: saturate(0.75);
        }

        .toggle-container input:checked + .toggle-slider::after {
          transform: scale(1) rotate(-24deg);
        }

        .toggle-container input:checked + .toggle-slider .background {
          transform: translateY(260%);
          opacity: 0;
        }

        .star {
          transform: scale(0);
          transition: 0.4s;
        }

        .toggle-container input:checked + .toggle-slider .star {
          position: absolute;
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-bottom: 7px solid var(--star);
          border-top: none;
          margin: 5px 0;
          transform: scale(0.3) translate(50%) rotate(35deg);
        }

        .toggle-container input:checked + .toggle-slider .star:last-child {
          transform: scale(0.4) translate(225%, 300%) rotate(35deg);
        }

        .toggle-container input:checked + .toggle-slider .star::before,
        .toggle-container input:checked + .toggle-slider .star::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: none;
        }

        .toggle-container input:checked + .toggle-slider .star::before {
          border: 3px solid transparent;
          border-bottom: 8px solid var(--star);
          transform: rotate(35deg);
          top: -7.5px;
          left: 1.5px;
        }

        .toggle-container input:checked + .toggle-slider .star::after {
          border: 10px solid transparent;
          border-bottom: 7px solid var(--star);
          transform: rotate(70deg);
          top: -7px;
          left: -4.5px;
        }

        .background {
          position: absolute;
          width: 10px;
          height: 10px;
          background: var(--cloud);
          border-radius: 50%;
          bottom: -4px;
          right: 0;
          box-shadow:
            0 -10px 0 8px var(--cloud),
            -10px 0px 0 8px var(--cloud),
            -45px 4px 0 5px var(--cloud),
            -60px 0px 0 3px var(--cloud),
            -29px 2px 0 8px var(--cloud);
          transition: 0.4s;
        }
      `}</style>

      <div>
        <div className="text-center">
          <label className="toggle-container">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleDarkMode}
            />
            <span className="toggle-slider">
              <div className="background"></div>
              <div className="star"></div>
              <div className="star"></div>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DarkModeToggle;