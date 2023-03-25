import React from "react";
import ApexLegendChooser from "./components/ApexLegendChooser";
import WeaponChooser from "./components/WeaponChooser";
import LandingPointChooser from "./components/LandingPointChooser";

function App() {
  return (
    <>
      <h1 className="big-text m-5px">Welcome!</h1>
      <h2 className="description">
        Here you can enjoy letting our "<em>very powerful algorithm</em>" decide
        a lot of stuff from the game Apex Legends!
      </h2>
      <ApexLegendChooser />
      <hr className="m-30px" />
      <WeaponChooser />
      <hr className="m-30px" />
      <LandingPointChooser />
    </>
  );
}

export default App;
