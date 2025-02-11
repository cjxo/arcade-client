import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/route.module.css";
import PixelArtCanvas from "../components/PixelArtCanvas";

const TitleScreen = () => {
  const options = ["Select Game", "Options"];
  const [optionIdx, setOptionIdx] = useState(0);

  useEffect(() => {
    const keyListen = (event) => {
      switch (event.key) {
        case "ArrowDown": {
          setOptionIdx((prevIdx) => {
            const newIdx = (prevIdx + 1) >= options.length ? 0 : prevIdx + 1;
            console.log("HOO", newIdx);
            return newIdx;
          });
        } break;

        case "ArrowUp": {
          setOptionIdx((prevIdx) => {
            const newIdx = (prevIdx - 1) < 0 ? options.length - 1 : prevIdx - 1;
            console.log("HELLO", newIdx);
            return newIdx;
          });
        } break;
      }
    };

    document.addEventListener("keydown", keyListen);
    return () => document.removeEventListener("keydown", keyListen);
  }, []);

  return (
    <main className={styles.titleScreen}>
      <div className={styles.center}>
        <h1>Arcade Games</h1>
        <ul className={styles.options}>
          {options.map((option, idx) => (
            <li key={option}><Link className={(idx === optionIdx) ? styles.selected : ""}>{option}</Link></li>
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
