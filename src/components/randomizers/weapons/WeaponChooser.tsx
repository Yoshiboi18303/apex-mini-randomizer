import { useState } from "react";
import {
  Weapon,
  setRandomWeaponLoadout,
  invertArrayValue,
  invertValue,
  ammoTypes,
  BaseComponentProps,
} from "../../../utils";
import Header from "../../Header";
import WeaponInfo from "./WeaponInfo";

export default function WeaponChooser({
  isDarkMode,
}: BaseComponentProps): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [carePackageWeaponsAllowed, setCarePackageWeaponsAllowed] =
    useState(false);
  const [selectedLoadout, setSelectedLoadout] = useState<Weapon[] | null>(null);

  return (
    <div>
      <Header
        title="Loadout Chooser"
        description="Here you can get a random weapon loadout to play with!"
        className="mb-30px"
      />
      {selectedLoadout && (
        <div className="types">
          {selectedLoadout.map((weapon, index) => {
            return (
              <div className="type" key={index}>
                <WeaponInfo
                  name={weapon.name}
                  ammoType={weapon.ammoType}
                  isCarePackageWeapon={weapon.isCarePackageWeapon}
                  isDarkMode={isDarkMode}
                  infoURL={weapon.infoURL}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="types">
        {allowedTypes.map((type, index) => {
          return (
            <div key={ammoTypes[index]} className="type">
              <h2 className="legend-type">{ammoTypes[index]}</h2>
              <button
                type="button"
                className={type ? "active" : "inactive"}
                onClick={() => invertArrayValue(index, setAllowedTypes)}
              >
                {type ? "Allowed" : "Not Allowed"}
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <h2 className="legend-type">Care Package Weapons</h2>
      <button
        className={
          carePackageWeaponsAllowed ? "active mb-30px" : "inactive mb-30px"
        }
        onClick={() => invertValue(setCarePackageWeaponsAllowed)}
      >
        {carePackageWeaponsAllowed ? "Allowed" : "Not Allowed"}
      </button>
      <br />
      <button
        type="button"
        className={`activator ${isDarkMode ? "dark-mode" : "light-mode"} m-5px`}
        onClick={() =>
          setRandomWeaponLoadout(
            allowedTypes,
            carePackageWeaponsAllowed,
            setSelectedLoadout
          )
        }
      >
        Generate Loadout
      </button>
    </div>
  );
}
