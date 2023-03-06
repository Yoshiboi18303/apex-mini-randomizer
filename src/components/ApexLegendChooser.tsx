import { useState } from "react";
import {
  getRandomLegend,
  getLegendType,
  Legend,
  invertArrayValue,
} from "../utils/";

export default function ApexLegendChooser(): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);

  return (
    <>
      {selectedLegend && (
        <div>
          <h2 className="big-text legend-name m-5px">{selectedLegend.name}</h2>
          <a
            href={selectedLegend.infoURL}
            className="description link"
            target="_blank"
            rel="noreferrer"
          >
            {selectedLegend.name}'s Info
          </a>
        </div>
      )}
      <br />
      <div className="types">
        {allowedTypes.map((type, index) => {
          return (
            <div key={getLegendType(index)} className="type">
              <h3 className="legend-type">{getLegendType(index)}</h3>
              <button
                key={index}
                className={type ? "active" : "inactive"}
                onClick={() => invertArrayValue(index, setAllowedTypes)}
              >
                {type ? "Active" : "Inactive"}
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <button
        className="activator m-5px"
        onClick={() => setSelectedLegend(getRandomLegend(allowedTypes))}
      >
        Select Legend
      </button>
    </>
  );
}
