import { useState } from "react";
import { getRandomLegend, getLegendType } from "../utils/";

export default function ApexLegendChooser(): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [selectedLegend, setSelectedLegend] = useState<string | null>(null);

  function invertSelected(index: number): void {
    const newAllowedTypes = [...allowedTypes];
    newAllowedTypes[index] = !newAllowedTypes[index];
    setAllowedTypes(newAllowedTypes);
  }

  return (
    <>
      {selectedLegend && (
        <h2 className="big-text legend-name m-5px">{selectedLegend}</h2>
      )}
      {allowedTypes.map((type, index) => {
        return type ? (
          <button
            key={index}
            className="active"
            onClick={() => invertSelected(index)}
          >
            {getLegendType(index)}
          </button>
        ) : (
          <button
            key={index}
            className="inactive"
            onClick={() => invertSelected(index)}
          >
            {getLegendType(index)}
          </button>
        );
      })}
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
