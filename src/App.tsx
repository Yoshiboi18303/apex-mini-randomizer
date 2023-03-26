import { useState } from "react";
import ApexLegendChooser from "./components/ApexLegendChooser";
import WeaponChooser from "./components/WeaponChooser";
import LandingPointChooser from "./components/LandingPointChooser";
import { invertValue } from "./utils/";

function App() {
  const [useDarkMode, setUseDarkMode] = useState(false);

  return (
    <div className={useDarkMode ? "dark-mode" : "light-mode"}>
      <button
        className={`activator ${
          useDarkMode ? "dark-mode" : "light-mode"
        } mb-30px`}
        type="button"
        onClick={() => invertValue(setUseDarkMode)}
      >
        Using {useDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
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
