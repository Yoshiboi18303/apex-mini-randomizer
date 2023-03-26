import { useState } from "react";
import {
  setRandomLegend,
  getLegendType,
  Legend,
  invertArrayValue,
} from "../utils/";

interface ApexLegendChooserProps {
  isDarkMode: boolean;
}

export default function ApexLegendChooser({
  isDarkMode,
}: ApexLegendChooserProps): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);

  return (
    <div>
      {selectedLegend && (
        <>
          <div>
            <h2 className="big-text legend-name m-5px">
              {selectedLegend.name}
            </h2>
            <a
              href={selectedLegend.infoURL}
              className="description link"
              target="_blank"
              rel="noreferrer"
            >
              {selectedLegend.name}'s Info
            </a>
          </div>
          <br />
        </>
      )}
      <div className="types">
        {allowedTypes.map((type, index) => {
          return (
            <div key={getLegendType(index)} className="type">
              <h3 className="legend-type">{getLegendType(index)}</h3>
              <button
                type="button"
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
        type="button"
        className={`activator ${isDarkMode ? "dark-mode" : "light-mode"} m-5px`}
        onClick={() => setRandomLegend(allowedTypes, setSelectedLegend)}
      >
        Select Legend
      </button>
    </div>
  );
}
