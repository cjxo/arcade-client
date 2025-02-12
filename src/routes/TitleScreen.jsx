import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../styles/route.module.css";
import PixelArtCanvas from "../components/PixelArtCanvas";

const TitleScreen = () => {
  const options = [
    {
      option: "Select Game",
      url: "/select-game"
    },
    {
      option: "Options",
      url: "/options"
    }
  ];

  const navigate = useNavigate();
  const [optionIdx, setOptionIdx] = useState(0);

  useEffect(() => {
    const keyListen = (event) => {
      switch (event.key) {
        case "ArrowDown": {
          setOptionIdx((prevIdx) => {
            const newIdx = (prevIdx + 1) >= options.length ? 0 : prevIdx + 1;
            return newIdx;
          });
        } break;

        case "ArrowUp": {
          setOptionIdx((prevIdx) => {
            const newIdx = (prevIdx - 1) < 0 ? options.length - 1 : prevIdx - 1;
            return newIdx;
          });
        } break;

        case "Enter": {
          navigate(options[optionIdx].url);
        } break;
      }
    };

    document.addEventListener("keydown", keyListen);
    return () => document.removeEventListener("keydown", keyListen);
  }, [optionIdx, navigate]);

  return (
    <main className={styles.titleScreen}>
      <div className={styles.center}>
        <h1>Arcade Games</h1>
        <ul className={styles.options}>
          {options.map(({ option, url }, idx) => (
            <li key={option}><Link to={url} className={(idx === optionIdx) ? styles.selected : ""}>{option}</Link></li>
          ))}
        </ul>
      </div>

      <div className={styles.bottomTip}>
        <div className={styles.tip}>
          <PixelArtCanvas
            alt="arrow keys"
            imageSrc="./src/assets/textures/navigate.png"
          />
          <p>Navigate</p>
        </div>

        <div className={styles.tip}>
          <PixelArtCanvas
            alt="enter"
            imageSrc="./src/assets/textures/enter.png"
            scaleX={3}
            scaleY={3}
          />
          <p>Select</p>
        </div>
      </div>
    </main>
  );
};

export default TitleScreen;
