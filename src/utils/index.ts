import React from "react";

export interface Legend {
    name: string;
    infoURL: string;
}

type AmmoType = "light" | "heavy" | "energy" | "sniper" | "shotgun" | "mythic";
type LootTier = "basic" | "mid" | "high" | "none";

// No changes to the array below should be made within the code (e.g. pushing, popping, shifting),
// That's why we call Object.freeze() here
export const ammoTypes = Object.freeze(["Light", "Heavy", "Energy", "Sniper", "Shotgun"]);

export interface Weapon {
    name: string;
    infoURL: string;
    ammoType: AmmoType;
    isCarePackageWeapon: boolean;
}

export interface Location {
    name: string;
    lootTier: LootTier;
    shownOnMap: boolean;
}

export interface ApexMap {
    name: string;
    imageURL: string;
    locations: Location[];
}

function getWikiURL(legendOrWeaponName: string): string {
    return "https://apexlegends.fandom.com/wiki/" + legendOrWeaponName.replace(" ", "_");
}

function addLegend(legendName: string): Legend {
    return {
        name: legendName,
        infoURL: getWikiURL(legendName)
    }
}

function addWeapon(weaponName: string, ammoType: AmmoType, isCarePackageWeapon: boolean = false): Weapon {
    if (ammoType !== "mythic" && isCarePackageWeapon) ammoType = "mythic";

    return {
        name: weaponName,
        ammoType,
        infoURL: getWikiURL(weaponName),
        isCarePackageWeapon,
    }
}

function addLocation(name: string, lootTier: LootTier, shownOnMap: boolean): Location {
    return {
        name,
        lootTier,
        shownOnMap,
    }
}

function addMap(name: string, imageURL: string, locations: Location[]): ApexMap {
    return {
        name,
        imageURL,
        locations,
    }
}

const legendMap = new Map<number, Legend[]>([
    [0, [
        addLegend("Bangalore"),
        addLegend("Revenant"),
        addLegend("Fuse"),
        addLegend("Ash"),
        addLegend("Mad Maggie")
    ]],
    [1, [
        addLegend("Pathfinder"),
        addLegend("Wraith"),
        addLegend("Mirage"),
        addLegend("Octane"),
        addLegend("Horizon"),
        addLegend("Valkyrie")
    ]],
    [2, [
        addLegend("Bloodhound"),
        addLegend("Crypto"),
        addLegend("Seer"),
        addLegend("Vantage")
    ]],
    [3, [
        addLegend("Gibraltar"),
        addLegend("Lifeline"),
        addLegend("Loba"),
        addLegend("Newcastle")
    ]],
    [4, [
        addLegend("Caustic"),
        addLegend("Wattson"),
        addLegend("Rampart"),
        addLegend("Catalyst")
    ]]
])

const legendTypes = Object.freeze(["Assault", "Skirmisher", "Recon", "Support", "Controller"]);

const weaponMap = new Map<number, Weapon[]>([
    [0, [
        addWeapon("HAVOC Rifle", "energy"),
        addWeapon("Devotion LMG", "energy"),
        addWeapon("L-STAR EMG", "energy"),
        addWeapon("Triple Take", "energy"),
        addWeapon("Volt SMG", "energy"),
        addWeapon("Nemesis Burst AR", "energy")
    ]], // Energy Ammo
    [1, [
        addWeapon("30-30 Repeater", "heavy"),
        addWeapon("C.A.R SMG", "heavy"),
        addWeapon("Prowler Burst PDW", "heavy"),
        addWeapon("Rampage LMG", "heavy"),
        addWeapon("VK-47 Flatline", "heavy")
    ]], // Heavy Ammo
    [2, [
        addWeapon("Alternator SMG", "light"),
        addWeapon("C.A.R SMG", "light"), // The CAR SMG can use Light Ammo as well, that's why it's here.
        addWeapon("G7 Scout", "light"),
        addWeapon("M600 Spitfire", "light"),
        addWeapon("P2020", "light"),
        addWeapon("R-99 SMG", "light"),
        addWeapon("R-301 Carbine", "light")
    ]], // Light Ammo
    [3, [
        addWeapon("EVA-8 Auto", "shotgun"),
        addWeapon("Mastiff Shotgun", "shotgun"),
        addWeapon("Mozambique Shotgun", "shotgun"),
        addWeapon("Peacekeeper", "shotgun")
    ]], // Shotgun Ammo
    [4, [
        addWeapon("Charge Rifle", "sniper"),
        addWeapon("Longbow DMR", "sniper"),
        addWeapon("Sentinel", "sniper"),
        addWeapon("Wingman", "sniper")
    ]], // Sniper Ammo
    [5, [
        addWeapon("Bocek Compound Bow", "mythic", true),
        addWeapon("Hemlok Burst AR", "mythic", true),
        addWeapon("Kraber", "mythic", true),
        addWeapon("RE-45 Auto", "mythic", true),
    ]] // Mythic Ammo
])

const allMaps = new Map<number, ApexMap>([
    [0, addMap("Kings Canyon", "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/d/d5/Transition_Kings_Canyon_MU3.png", [
        addLocation("Airbase", "high", true),
        addLocation("ARES Capacitor", "mid", true),
        addLocation("Artillery Battery", "high", true),
        addLocation("Artillery Underpass", "basic", false),
        addLocation("Basin", "high", false),
        addLocation("Broken Coast", "basic", false),
        addLocation("Broken Coast Overlook", "mid", false),
        addLocation("Broken Coast South", "basic", false),
        addLocation("Broken Relay", "none", false),
        addLocation("Bunker Pass", "high", true),
        addLocation("Cable Suspension", "basic", false),
        addLocation("Cage", "mid", true),
        addLocation("Cage Crossing", "basic", false),
        addLocation("Capacitor Junction", "basic", false),
        addLocation("Capacitor Overlook", "mid", false),
        addLocation("Capacitor Tunnel", "basic", false),
        addLocation("Caustic Treatment", "high", true),
        addLocation("Caves", "basic", false),
        addLocation("Crashed Ship", "high", false),
        addLocation("Crash Site", "high", true)
    ])]
])

function getMessage(allowedTypes: Array<any>) {
    return `Invalid number of allowed types\n\nRequired: 5\nFound: ${allowedTypes.length}`;
}

export function getRandomLegend(allowedTypes: boolean[]): Legend | null {
    if (allowedTypes.length !== 5) throw new Error(getMessage(allowedTypes));

    const legends: Legend[] = [];

    for (let index = 0; index < allowedTypes.length; index++) {
        const legendArray = legendMap.get(index);
        if (legendArray && allowedTypes[index]) {
            legends.push(...legendArray);
        }
    }

    let selectedLegend: Legend | null = null;

    if (legends.length > 0) {
        selectedLegend = legends[Math.floor(Math.random() * legends.length)];
    }

    return selectedLegend;
}

export function getLegendType(index: number): string | null {
    if (index < 0 || index >= legendTypes.length) return null;
    return legendTypes[index];
}

export function getRandomWeaponLoadout(allowedTypes: boolean[], carePackageWeaponsAllowed: boolean): Weapon[] {
    if (allowedTypes.length !== 5) throw new Error(getMessage(allowedTypes));
    const loadout: Weapon[] = [];
    const allWeapons: Weapon[] = [];

    for (let index = 0; index < allowedTypes.length; index++) {
        const weapons = weaponMap.get(index);
        if (weapons && allowedTypes[index]) {
            allWeapons.push(...weapons)
        }
    }

    if (carePackageWeaponsAllowed) for (const weapon of weaponMap.get(5)!) allWeapons.push(weapon);

    for (let index = 0; index < 2; index++) {
        const weapon = allWeapons[Math.floor(Math.random() * allWeapons.length)]
        loadout.push(weapon)
        loadout.splice(allWeapons.findIndex((value) => value === weapon), 1)
    }

    return loadout;
}

export function invertArrayValue(index: number, set: React.Dispatch<React.SetStateAction<boolean[]>>): void {
    set(prev => {
        const newAllowedTypes = [...prev];
        newAllowedTypes[index] = !newAllowedTypes[index];
        return newAllowedTypes;
    });
}

export function invertValue(set: React.Dispatch<React.SetStateAction<boolean>>): void {
    set(prev => !prev)
}

export function getAmmoType(type: AmmoType): string {
    switch (type) {
        case "light":
            return ammoTypes[0];
        case "heavy":
            return ammoTypes[1];
        case "energy":
            return ammoTypes[2];
        case "sniper":
            return ammoTypes[3];
        case "shotgun":
            return ammoTypes[4];
        case "mythic":
            return "Mythic";
    }
}

export function getLootTier(lootTier: LootTier): string {
    switch (lootTier) {
        case "basic":
            return "Basic-tier Loot";
        case "mid":
            return "Mid-tier Loot";
        case "high":
            return "High-tier Loot";
        default:
            return "No Loot In Area";
    }
}

export function getMapArray(set: React.Dispatch<React.SetStateAction<ApexMap[]>> | null = null): ApexMap[] {
    const mapArray = Array.from(allMaps.values());
    if (set) set(mapArray);
    return mapArray;
}

export function getLandingPoint(mapIndex: number, locationsOnMapOnly: boolean): Location | null {
    const map = allMaps.get(mapIndex);

    if (map) {
        const locations = locationsOnMapOnly ? map.locations.filter(location => location.shownOnMap === true) : map.locations;
        return locations[Math.floor(Math.random() * locations.length)];
    } else return null;
}
