import { ApexMap, ReadOnlyArray, Setter } from "../../../utils";

interface MapSelectorProps {
  mapArray: ApexMap[] | ReadOnlyArray<ApexMap>;
  selectedMap: ApexMap | null;
  setSelectedMap: Setter<ApexMap | null>;
}

export default function MapSelector({
  mapArray,
  selectedMap,
  setSelectedMap,
}: MapSelectorProps) {
  return (
    <div>
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
    </div>
  );
}
