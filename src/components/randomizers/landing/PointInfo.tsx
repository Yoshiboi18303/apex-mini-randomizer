import { Location, getLootTier } from "../../../utils/";

interface PointInfoProps {
  chosenPoint: Location;
}

export default function PointInfo({ chosenPoint }: PointInfoProps) {
  return (
    <div>
      <h2 className="big-text legend-name m-5px">{chosenPoint.name}</h2>
      <h3 className="description">{getLootTier(chosenPoint.lootTier)}</h3>
      <h3 className="description">
        {chosenPoint.shownOnMap
          ? "Is Shown on In-Game Map"
          : "Is Not Shown on In-Game Map"}
      </h3>
    </div>
  );
}
