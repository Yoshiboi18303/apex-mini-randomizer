import { useState } from "react";
import {
  Weapon,
  setRandomWeaponLoadout,
  invertArrayValue,
  invertValue,
  ammoTypes,
} from "../utils/";
import WeaponInfo from "./WeaponInfo";

export default function WeaponChooser(): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [carePackageWeaponsAllowed, setCarePackageWeaponsAllowed] =
    useState(false);
  const [selectedLoadout, setSelectedLoadout] = useState<Weapon[] | null>(null);

  return (
    <div>
      {selectedLoadout && (
        <div className="types">
          {selectedLoadout.map((weapon, index) => {
            return (
              <div className="type" key={index}>
                <WeaponInfo
                  name={weapon.name}
                  ammoType={weapon.ammoType}
                  isCarePackageWeapon={weapon.isCarePackageWeapon}
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
                {type ? "Active" : "Inactive"}
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
        {carePackageWeaponsAllowed ? "Active" : "Inactive"}
      </button>
      <br />
      <button
        type="button"
        className="activator m-5px"
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