import { useState } from "react";
import {
  Location,
  ApexMap,
  setLandingPoint,
  getMapArray,
  getLootTier,
  invertValue,
} from "../utils/";

export default function LandingPointChooser(): JSX.Element {
  const mapArray = getMapArray();
  const [selectedMap, setSelectedMap] = useState<ApexMap | null>(null);
  const [chosenPoint, setChosenPoint] = useState<Location | null>(null);
  const [locationsOnMapOnly, setLocationsOnMapOnly] = useState<boolean>(false);

  return (
    <div>
      {chosenPoint && (
        <div>
          <h2 className="big-text legend-name m-5px">{chosenPoint.name}</h2>
          <h3 className="description m-5px">
            {getLootTier(chosenPoint.lootTier)}
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
        className="activator m-5px"
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
