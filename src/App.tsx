import { useState, useEffect } from "react";
import ApexLegendChooser from "./components/randomizers/ApexLegendChooser";
import WeaponChooser from "./components/randomizers/weapons/WeaponChooser";
import LandingPointChooser from "./components/randomizers/landing/LandingPointChooser";
import Banner from "./components/Banner";
import ConsequenceChooser from "./components/randomizers/consequences/ConsequenceChooser";
import { invertValue, getLocalStorageData } from "./utils/";
import Footer from "./components/Footer";

function isAprilFools(currentDate: Date = new Date()): boolean {
  // currentDate.getMonth() returns an index of the month, so 3 = 4 in this situation.
  return currentDate.getMonth() === 3 && currentDate.getDate() === 1;
}

function App() {
  const [useDarkMode, setUseDarkMode] = useState(
    getLocalStorageData<boolean>("isDarkMode", false)
  );
  const currentDate = new Date();
  const isAprilFoolsDay = isAprilFools(currentDate);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(useDarkMode));
  }, [useDarkMode]);

  return (
    <div
      className={
        useDarkMode
          ? "dark-mode"
          : isAprilFoolsDay
          ? "april-fools-light-mode"
          : "light-mode"
      }
    >
      {isAprilFoolsDay && (
        <Banner
          message={
            !useDarkMode
              ? "🎉 Happy April Fools' Day, enjoy the yellow background! 🎉"
              : "🎉 Happy April Fools' Day! 🎉"
          }
          isDarkMode={useDarkMode}
        />
      )}
      <div
        className={`mode-selector ${
          useDarkMode
            ? "dark-mode"
            : isAprilFoolsDay
            ? "light-mode-april-fools"
            : "light-mode"
        }`}
      >
        <h3 className="description">
          Using {useDarkMode ? "Dark Mode" : "Light Mode"}
        </h3>
        <button
          className={`activator ${
            useDarkMode ? "dark-mode" : "light-mode"
          } mb-30px`}
          type="button"
          onClick={() => invertValue(setUseDarkMode)}
        >
          Switch To {useDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <h1 className="big-text m-5px">Welcome!</h1>
      <h2 className="description">
        Here you can enjoy letting our "<em>very powerful algorithm</em>" decide
        a lot of stuff from the game Apex Legends!
      </h2>
      <hr className="m-30px" />
      <ApexLegendChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <WeaponChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <LandingPointChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <ConsequenceChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <Footer isDarkMode={useDarkMode}>
        <div>
          <h4 className="footer-text">
            © {currentDate.getFullYear()} Yoshiboi18303 |{" "}
            <a
              href="https://github.com/Yoshiboi18303/apex-mini-randomizer/blob/main/LICENSE"
              className="footer-text link"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </h4>
          <h6 className="footer-text mb-30">
            This project is in no way sponsored, affiliated or endorsed with
            EA/Respawn, Apex Legends is property of Electronic Arts/Respawn
            Entertainment. This was made by <b>a player, for players.</b>
          </h6>
          <br />
          <h4 className="footer-text">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/Yoshiboi18303"
              className="footer-text link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Yoshiboi18303</b>
            </a>
          </h4>
        </div>
      </Footer>
    </div>
  );
}

export default App;
