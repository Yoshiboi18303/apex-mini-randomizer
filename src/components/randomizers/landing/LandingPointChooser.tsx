import { useState } from "react";
import {
  Location,
  ApexMap,
  setLandingPoint,
  getMapArray,
  invertValue,
  BaseComponentProps,
} from "../../../utils";
import Header from "../../Header";
import MapSelector from "./MapSelector";
import PointInfo from "./PointInfo";

export default function LandingPointChooser({
  isDarkMode,
}: BaseComponentProps): JSX.Element {
  const mapArray = getMapArray();
  const [selectedMap, setSelectedMap] = useState<ApexMap | null>(null);
  const [locationsOnMapOnly, setLocationsOnMapOnly] = useState(false);
  const [chosenPoint, setChosenPoint] = useState<Location | null>(null);

  return (
    <div>
      <Header
        title="Landing Point Chooser"
        description="Here you can have a random landing point to start in!"
        className="mb-30px"
      />
      {chosenPoint && <PointInfo chosenPoint={chosenPoint} />}
      <MapSelector
        mapArray={mapArray}
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap}
      />
      <h2 className="legend-type">Locations On Map Only</h2>
      <button
        type="button"
        className={locationsOnMapOnly ? "active mb-30px" : "inactive mb-30px"}
        onClick={() => invertValue(setLocationsOnMapOnly)}
      >
        {locationsOnMapOnly ? "Yes" : "No"}
      </button>
      <br />
      <button
        type="button"
        className={`${selectedMap ? "activator" : "disabled"} ${
          isDarkMode ? "dark-mode" : "light-mode"
        } m-5px`}
        onClick={() =>
          setLandingPoint(selectedMap!, setChosenPoint, locationsOnMapOnly)
        }
        disabled={!selectedMap}
      >
        Select Landing Point
      </button>
    </div>
  );
}
