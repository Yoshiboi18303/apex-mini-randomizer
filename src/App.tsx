import React from "react";
import ApexLegendChooser from "./components/ApexLegendChooser";
import WeaponChooser from "./components/WeaponChooser";

function App() {
  return (
    <>
      <h1 className="big-text m-5px">Welcome!</h1>
      <h2 className="description">
        Here you can enjoy letting our "<em>very powerful algorithm</em>" decide
        what Legend you play as in Apex Legends!
      </h2>
      <ApexLegendChooser />
      <hr className="m-30px" />
      <WeaponChooser />
    </>
  );
}

export default App;
