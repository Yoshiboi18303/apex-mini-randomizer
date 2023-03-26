import { useState } from "react";
import ApexLegendChooser from "./components/ApexLegendChooser";
import WeaponChooser from "./components/WeaponChooser";
import LandingPointChooser from "./components/LandingPointChooser";
import Banner from "./components/Banner";
import { invertValue } from "./utils/";

function isAprilFools(currentDate: Date): boolean {
  // currentDate.getMonth() returns an index of the month, so 3 = 4 in this situation.
  return currentDate.getMonth() === 3 && currentDate.getDate() === 1;
}

function App() {
  const [useDarkMode, setUseDarkMode] = useState(false);
  const currentDate = new Date();
  const isAprilFoolsDay = isAprilFools(currentDate);

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
      {isAprilFoolsDay && !useDarkMode && (
        <Banner message="🎉 Happy April Fools' Day, enjoy the yellow background! 🎉" />
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
    </div>
  );
}

export default App;
