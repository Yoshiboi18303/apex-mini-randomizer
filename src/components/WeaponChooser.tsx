import { useState } from "react";
import {
  Weapon,
  setRandomWeaponLoadout,
  invertArrayValue,
  invertValue,
  ammoTypes,
  getAmmoType,
} from "../utils/";

export default function WeaponChooser(): JSX.Element {
  const [allowedTypes, setAllowedTypes] = useState<boolean[]>(
    Array(5).fill(true)
  );
  const [carePackageWeaponsAllowed, setCarePackageWeaponsAllowed] =
    useState(false);
  const [showWeaponAmmoType, setShowWeaponAmmoType] = useState(false);
  const [selectedLoadout, setSelectedLoadout] = useState<Weapon[] | null>(null);

  return (
    <div>
      {selectedLoadout && (
        <div className="types">
          {selectedLoadout.map((weapon, index) => {
            return (
              <div className="type" key={index}>
                <h2 className="big-text legend-name m-5px">{weapon.name}</h2>
                {showWeaponAmmoType &&
                  weapon.ammoType !== "mythic" &&
                  weapon.ammoType !== "none" && (
                    <h3 className="description">
                      {getAmmoType(weapon.ammoType)}
                    </h3>
                  )}
                {weapon.ammoType !== "mythic" && weapon.ammoType !== "none" && (
                  <button
                    type="button"
                    className="activator m-5px"
                    onClick={() => invertValue(setShowWeaponAmmoType)}
                  >
                    {!showWeaponAmmoType ? "Show Ammo Type" : "Hide Ammo Type"}
                  </button>
                )}
                {weapon.isCarePackageWeapon ? (
                  <h3 className="description">
                    Can <b className="big-text">ONLY</b> be found in a{" "}
                    <b>Care Package</b>
                  </h3>
                ) : weapon.ammoType === "none" ? (
                  <h3 className="description">No Weapon, sorry...</h3>
                ) : (
                  <h3 className="description">
                    Can be found on the ground or in a replicator.
                  </h3>
                )}
                {weapon.infoURL && (
                  <a
                    href={weapon.infoURL}
                    className="description link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Info of <b>{weapon.name}</b>
                  </a>
                )}
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
