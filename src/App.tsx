import React from "react";
import ApexLegendChooser from "./components/ApexLegendChooser";

function App() {
  return (
    <>
      <h1 className="big-text m-5px">Welcome!</h1>
      <h2 className="description">
        Here you can enjoy letting our "<em>very powerful algorithm</em>" decide
        what Legend you play as in Apex Legends!
      </h2>
      <ApexLegendChooser />
    </>
  );
}

export default App;
