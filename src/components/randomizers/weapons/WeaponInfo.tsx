import { useState } from "react";
import {
  BaseComponentProps,
  getAmmoType,
  invertValue,
  Weapon,
} from "../../../utils";

interface WeaponInfoProps extends BaseComponentProps, Weapon {}

export default function WeaponInfo({
  name,
  ammoType,
  isCarePackageWeapon,
  isDarkMode,
  infoURL = undefined,
}: WeaponInfoProps): JSX.Element {
  const [showWeaponAmmoType, setShowWeaponAmmoType] = useState(false);

  return (
    <>
      <h2 className="big-text legend-name m-5px">{name}</h2>
      {showWeaponAmmoType && ammoType !== "mythic" && ammoType !== "none" && (
        <h3 className="description">{getAmmoType(ammoType)}</h3>
      )}
      {ammoType !== "mythic" && ammoType !== "none" && (
        <button
          type="button"
          className={`activator ${
            isDarkMode ? "dark-mode" : "light-mode"
          } m-5px`}
          onClick={() => invertValue(setShowWeaponAmmoType)}
        >
          {!showWeaponAmmoType ? "Show Ammo Type" : "Hide Ammo Type"}
        </button>
      )}
      {isCarePackageWeapon ? (
        <h3 className="description">
          Can <b className="big-text">ONLY</b> be found in a <b>Care Package</b>
        </h3>
      ) : ammoType === "none" ? (
        <h3 className="description">No Weapon, sorry...</h3>
      ) : (
        <h3 className="description">
          Can be found on the ground or in a replicator.
        </h3>
      )}
      {infoURL && (
        <a
          href={infoURL}
          className="description link"
          target="_blank"
          rel="noreferrer"
        >
          Info of <b>{name}</b>
        </a>
      )}
    </>
  );
}
