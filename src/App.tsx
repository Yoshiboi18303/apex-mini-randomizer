import { useState, useEffect } from "react";
import ApexLegendChooser from "./components/randomizers/ApexLegendChooser";
import WeaponChooser from "./components/randomizers/WeaponChooser";
import LandingPointChooser from "./components/randomizers/LandingPointChooser";
import Banner from "./components/Banner";
import ConsequenceChooser from "./components/randomizers/consequences/ConsequenceChooser";
import { invertValue, getLocalStorageData } from "./utils/";

function isAprilFools(currentDate: Date = new Date()): boolean {
  // currentDate.getMonth() returns an index of the month, so 3 = 4 in this situation.
  return currentDate.getMonth() === 3 && currentDate.getDate() === 1;
}

function App() {
  const [useDarkMode, setUseDarkMode] = useState(
    getLocalStorageData<boolean>("isDarkMode", false)
  );
  const isAprilFoolsDay = isAprilFools();

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
      <ApexLegendChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <WeaponChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <LandingPointChooser isDarkMode={useDarkMode} />
      <hr className="m-30px" />
      <ConsequenceChooser isDarkMode={useDarkMode} />
    </div>
  );
}

export default App;
