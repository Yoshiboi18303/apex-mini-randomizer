import { useState } from "react";
import {
  Location,
  ApexMap,
  setLandingPoint,
  getMapArray,
  getLootTier,
  invertValue,
  BaseComponentProps,
} from "../../utils/";
import Header from "../Header";

export default function LandingPointChooser({
  isDarkMode,
}: BaseComponentProps): JSX.Element {
  const mapArray = getMapArray();
  const [selectedMap, setSelectedMap] = useState<ApexMap | null>(null);
  const [chosenPoint, setChosenPoint] = useState<Location | null>(null);
  const [locationsOnMapOnly, setLocationsOnMapOnly] = useState<boolean>(false);

  return (
    <div>
      <Header
        title="Landing Point Chooser"
        description="Here you can have a random landing point to start in!"
        className="mb-30px"
      />
      {chosenPoint && (
        <div>
          <h2 className="big-text legend-name m-5px">{chosenPoint.name}</h2>
          <h3 className="description">{getLootTier(chosenPoint.lootTier)}</h3>
          <h3 className="description">
            {chosenPoint.shownOnMap
              ? "Is Shown on In-Game Map"
              : "Is Not Shown on In-Game Map"}
          </h3>
        </div>
      )}
      <h2 className="legend-type m-5px">Select A Map</h2>
      <div className="types m-5px">
        {mapArray.map((map, index) => {
          const isSelectedMap = selectedMap === map;

          return (
            <div className="type" key={index}>
              <button
                type="button"
                className={isSelectedMap ? "active" : "inactive"}
                onClick={() => setSelectedMap(map)}
              >
                {map.name}
              </button>
            </div>
          );
        })}
      </div>
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
        className={`activator ${isDarkMode ? "dark-mode" : "light-mode"} m-5px`}
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
