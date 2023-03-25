import React from "react";
import images from "../images.json";

type Images = {
    maps: {
        [key: string]: string;
    }
}
type AmmoType = "light" | "heavy" | "energy" | "sniper" | "shotgun" | "mythic" | "none";
type LootTier = "basic" | "mid" | "high" | "none" | "unknown";
type MathOperator = "less" | "lessOrEqual" | "equal" | "greater" | "greaterOrEqual";
type ConsequenceSeverity = "low" | "medium" | "high";
export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReadOnlyArray<T = unknown> = readonly T[];

const legendTypes: ReadOnlyArray<string> = ["Assault", "Skirmisher", "Recon", "Support", "Controller"];
export const ammoTypes: ReadOnlyArray<string> = ["Light", "Heavy", "Energy", "Sniper", "Shotgun"];

export interface Legend {
    name: string;
    infoURL: string;
}

export interface Weapon {
    name: string;
    ammoType: AmmoType;
    isCarePackageWeapon: boolean;
    infoURL?: string;
}

export interface Location {
    name: string;
    lootTier: LootTier;
    shownOnMap: boolean;
}

export interface ApexMap {
    name: string;
    imageURL: string;
    infoURL: string;
    locations: Location[];
}

export interface Consequence {
    name: string;
    severity: ConsequenceSeverity;
}

function getWikiURL(name: string): string {
    return "https://apexlegends.fandom.com/wiki/" + name.replace(" ", "_");
}

function addLegend(legendName: string): Legend {
    return {
        name: legendName,
        infoURL: getWikiURL(legendName)
    }
}

function addWeapon(weaponName: string, ammoType: AmmoType, isCarePackageWeapon: boolean = false, addInfoURL: boolean = true): Weapon {
    if (ammoType !== "mythic" && isCarePackageWeapon) ammoType = "mythic";

    return {
        name: weaponName,
        ammoType,
        infoURL: addInfoURL ? getWikiURL(weaponName) : undefined,
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
        infoURL: getWikiURL(name),
        locations,
    }
}

export function makeConsequence(name: string, severity: ConsequenceSeverity = "low"): Consequence {
    return {
        name,
        severity,
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

const weaponMap = new Map<number, Weapon[]>([
    [0, [
        addWeapon("Alternator SMG", "light"),
        addWeapon("C.A.R SMG", "light"), // The CAR SMG can use Light Ammo as well, that's why it's here.
        addWeapon("G7 Scout", "light"),
        addWeapon("M600 Spitfire", "light"),
        addWeapon("P2020", "light"),
        addWeapon("R-99 SMG", "light"),
        addWeapon("R-301 Carbine", "light")
    ]], // Light Ammo
    [1, [
        addWeapon("30-30 Repeater", "heavy"),
        addWeapon("C.A.R SMG", "heavy"),
        addWeapon("Prowler Burst PDW", "heavy"),
        addWeapon("Rampage LMG", "heavy"),
        addWeapon("VK-47 Flatline", "heavy")
    ]], // Heavy Ammo
    [2, [
        addWeapon("HAVOC Rifle", "energy"),
        addWeapon("Devotion LMG", "energy"),
        addWeapon("L-STAR EMG", "energy"),
        addWeapon("Triple Take", "energy"),
        addWeapon("Volt SMG", "energy"),
        addWeapon("Nemesis Burst AR", "energy")
    ]], // Energy Ammo
    [3, [
        addWeapon("Charge Rifle", "sniper"),
        addWeapon("Longbow DMR", "sniper"),
        addWeapon("Sentinel", "sniper"),
        addWeapon("Wingman", "sniper")
    ]], // Sniper Ammo
    [4, [
        addWeapon("EVA-8 Auto", "shotgun"),
        addWeapon("Mastiff Shotgun", "shotgun"),
        addWeapon("Mozambique Shotgun", "shotgun"),
        addWeapon("Peacekeeper", "shotgun")
    ]], // Shotgun Ammo
    [5, [
        addWeapon("Bocek Compound Bow", "mythic", true),
        addWeapon("Hemlok Burst AR", "mythic", true),
        addWeapon("Kraber", "mythic", true),
        addWeapon("RE-45 Auto", "mythic", true),
    ]] // Mythic Ammo
])

const allMaps = new Map<number, ApexMap>([
    [0, addMap("Kings Canyon", images.maps["King's Canyon"], [
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
        addLocation("Crash Site", "high", true),
        addLocation("Creature Containment", "mid", true),
        addLocation("Crossroads", "basic", false),
        addLocation("Crypto's Map Room", "high", true),
        addLocation("Destroyed Artillery Tunnel", "basic", false),
        addLocation("Destroyed Cascades", "mid", false),
        addLocation("East Settlement", "basic", false),
        addLocation("Golden Sands", "basic", false),
        addLocation("High Desert", "high", false),
        addLocation("Hillside Outpost", "mid", false),
        addLocation("Hydro Dam", "mid", true),
        addLocation("Hydro Tunnel", "basic", false),
        addLocation("Lagoon Crossing", "mid", false),
        addLocation("Marketplace", "mid", true),
        addLocation("Octane's Gauntlet", "mid", true),
        addLocation("Offshore Rig", "high", true),
        addLocation("Offshore Rig Loading", "basic", false),
        addLocation("Reclaimed Forest", "mid", false),
        addLocation("Repulsor", "high", true),
        addLocation("Relic", "high", true),
        addLocation("River Center", "mid", false),
        addLocation("Runoff", "high", true),
        addLocation("Skull Salvage", "high", false),
        addLocation("Singh Labs", "mid", true),
        addLocation("Singh Labs Interior", "high", false),
        addLocation("Spotted Lake", "high", true),
        addLocation("Suspended Skull", "basic", false),
        addLocation("Swamps", "high", true),
        addLocation("The Pit", "high", true),
        addLocation("Two Spines", "mid", false),
        addLocation("Two Spines Outpost", "mid", false),
        addLocation("Uncovered Bones", "basic", false),
        addLocation("Verdant Crossing", "mid", false),
        addLocation("Watchtower North", "high", false),
        addLocation("Watchtower South", "high", false),
    ])],
    [1, addMap("World's Edge", images.maps["World's Edge"], [
        addLocation("Rampart's Big Maude", "high", true),
        addLocation("Bloodhound's Trials", "high", true),
        addLocation("Countdown", "high", true),
        addLocation("Fragment East", "mid", true),
        addLocation("Fragment West", "mid", true),
        addLocation("Fissure Crossing", "basic", false),
        addLocation("Harvester", "high", true),
        addLocation("Hill Valley", "basic", false),
        addLocation("Launch Site", "high", true),
        addLocation("Lava City", "high", true),
        addLocation("Lava Fissure", "high", true),
        addLocation("Lava Siphon", "high", true),
        addLocation("Overlook", "high", true),
        addLocation("Staging", "high", true),
        addLocation("Skyhook", "high", true),
        addLocation("Spring's End", "mid", false),
        addLocation("Storage Room", "high", false),
        addLocation("Survey Camp", "high", true),
        addLocation("Thermal Station", "high", true),
        addLocation("The Bridge", "basic", false),
        addLocation("The Dome", "high", true),
        addLocation("The Epicenter", "high", true),
        addLocation("The Geyser", "high", true),
        addLocation("The Mining Pass", "basic", false),
        addLocation("The Rain Tunnel", "basic", false),
        addLocation("The Tree", "high", true),
    ])],
    [2, addMap("Olympus", images.maps["Olympus"], [
        addLocation("Agriculture Entry", "basic", false),
        addLocation("Antechamber", "basic", false),
        addLocation("Autumn Estates", "high", true),
        addLocation("Bonsai Plaza", "mid", true),
        addLocation("Bonsai Hillside", "basic", false),
        addLocation("Arcadia Supercarrier", "high", true),
        addLocation("Central Turbine", "mid", true),
        addLocation("Defense Perimeter", "basic", false),
        addLocation("Docks", "high", true),
        addLocation("Elysium", "high", true),
        addLocation("Energy Depot", "high", true),
        addLocation("Farmstead", "basic", false),
        addLocation("Grow Towers", "mid", true),
        addLocation("Golden Gardens", "mid", true),
        addLocation("Hammond Labs", "mid", true),
        addLocation("Hydroponics", "high", true),
        addLocation("Ivory Pass", "basic", false),
        addLocation("Lab Annex", "basic", false),
        addLocation("Lifeline's Clinic", "high", true),
        addLocation("Maintenance", "basic", false),
        addLocation("Orbital Cannon Test Site", "high", true),
        addLocation("Pathfinder's Fight Night", "high", true),
        addLocation("Phase Gateway Central", "basic", false),
        addLocation("Phase Gateway West", "basic", false),
        addLocation("Primary Power Grid", "mid", false),
        addLocation("Rift Aftermath", "high", true),
        addLocation("Research Basin", "high", false),
        addLocation("Secondary Power Grid", "basic", false),
        addLocation("Shipyard", "basic", false),
        addLocation("Solar Array", "mid", true),
        addLocation("Supply Track", "basic", false),
        addLocation("The Icarus", "high", true),
        addLocation("The Reverie Lounge", "high", true),
        addLocation("Underpass", "basic", false),
        addLocation("Velvet Oasis", "mid", true),
        addLocation("Wildflower Meadow", "basic", false),
    ])],
    [3, addMap("Storm Point", images.maps["Storm Point"], [
        addLocation("AOB", "basic", false),
        addLocation("Alex's Crossing", "basic", false),
        addLocation("Antenna", "mid", true),
        addLocation("Barometer", "mid", true),
        addLocation("Black Sand Islands", "basic", false),
        addLocation("Black Diamond", "basic", false),
        addLocation("Bunny Slope", "basic", false),
        addLocation("Cascade Falls", "mid", true),
        addLocation("The Caves", "mid", false),
        addLocation("Cenote Cave", "high", true),
        addLocation("Checkpoint", "high", true),
        addLocation("Colony East Camp", "basic", false),
        addLocation("Command Center", "mid", true),
        addLocation("Cory's Crossing", "basic", false),
        addLocation("David's Crossing", "basic", false),
        addLocation("Davis' Crossing", "basic", false),
        addLocation("Downed Beast", "high", true),
        addLocation("East Lift", "basic", false),
        addLocation("East Trail", "basic", false),
        addLocation("Fish Farms", "mid", true),
        addLocation("Forbidden Zone", "high", false),
        addLocation("Forest", "mid", false),
        addLocation("Gale Station", "mid", true),
        addLocation("Highpoint", "mid", true),
        addLocation("The Lagoon", "basic", false),
        addLocation("Launch Pad", "high", true),
        addLocation("Lightning Rod", "high", true),
        addLocation("Lonely Island", "basic", false),
        addLocation("McCord's Crossing", "basic", false),
        addLocation("Medina Island", "unknown", false),
        addLocation("Meridian Outpost", "unknown", false),
        addLocation("The Mill", "high", true),
        addLocation("Mountain Cave", "basic", false),
        addLocation("Mountain Lift", "basic", false),
        addLocation("Mountain Top", "basic", false),
        addLocation("North Pad", "mid", true),
        addLocation("Oasis", "basic", false),
        addLocation("Prowler Island", "basic", false),
        addLocation("Prowler Den", "unknown", false),
        addLocation("River's Center", "basic", false),
        addLocation("Ship Fall", "high", true),
        addLocation("Siren Isle", "basic", false),
        addLocation("Southern Point", "basic", false),
        addLocation("Storm Catcher", "mid", true),
        addLocation("The Ridge", "basic", false),
        addLocation("Thunder Watch", "high", true),
        addLocation("Trenches", "basic", false),
        addLocation("Uncharted Cliffs", "basic", false),
        addLocation("The Wall", "mid", true),
        addLocation("Water Hole", "basic", false),
        addLocation("Zavala's Crossing", "basic", false)
    ])],
    [4, addMap("Broken Moon", images.maps["Broken Moon"], [
        addLocation("Breaker Wharf", "high", true),
        addLocation("Black Sands", "basic", false),
        addLocation("Dry Gulch", "mid", true),
        addLocation("Haven", "basic", false),
        addLocation("North Road", "basic", false),
        addLocation("Production Yard", "high", true),
        addLocation("Research Corridor", "basic", false),
        addLocation("The Foundry", "high", true),
        addLocation("Cultivation", "mid", true),
        addLocation("Windy Hill", "basic", false),
        addLocation("Atmostation", "mid", true),
        addLocation("Retreat", "basic", false),
        addLocation("Bionomics", "high", true),
        addLocation("The Divide", "high", true),
        addLocation("Gardenview Hill", "basic", false),
        addLocation("Riverfront", "basic", false),
        addLocation("North Promenade", "mid", true),
        addLocation("South Promenade", "mid", true),
        addLocation("Water Works", "basic", false),
        addLocation("Broken Forest", "basic", false),
        addLocation("Intersection", "basic", false),
        addLocation("Terraformer", "high", true),
        addLocation("Eternal Gardens", "high", true),
        addLocation("Statis Array", "mid", true),
        addLocation("Misty Hill", "basic", false),
        addLocation("Garden Pass", "basic", false),
        addLocation("Backup Atmo", "high", true),
        addLocation("Lunar Cave", "basic", false),
        addLocation("Alpha Base", "high", true),
        addLocation("Moon's End", "basic", false),
        addLocation("Perpetual Core", "high", true)
    ])],
])

function getErrorMessage(allowedTypes: unknown[], requiredLength: number) {
    return `Invalid number of allowed types\n\nRequired: ${requiredLength}\nFound: ${allowedTypes.length}`;
}

export function getRandomItemFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

export function setRandomLegend(allowedTypes: boolean[], set: Setter<Legend | null>): void {
    if (allowedTypes.length !== 5) throw new Error(getErrorMessage(allowedTypes, 5));

    const legends: Legend[] = [];

    for (let index = 0; index < allowedTypes.length; index++) {
        const legendArray = legendMap.get(index);
        if (legendArray && allowedTypes[index]) {
            legends.push(...legendArray);
        }
    }

    let selectedLegend: Legend | null = null;

    if (legends.length > 0) selectedLegend = getRandomItemFromArray(legends);

    set(selectedLegend);
}

export function getLegendType(index: number): string | null {
    if (index < 0 || index >= legendTypes.length) return null;
    return legendTypes[index];
}

function calculatePossibility(baseNumber: number, requiredValue: number, operator: MathOperator): boolean {
    switch (operator) {
        case "less":
            return baseNumber < requiredValue;
        case "lessOrEqual":
            return baseNumber <= requiredValue;
        case "equal":
            return baseNumber === requiredValue;
        case "greater":
            return baseNumber > requiredValue;
        case "greaterOrEqual":
            return baseNumber >= requiredValue;
    }
}

/**
 * Gets whether a possibility is successful or not based on the provided `requiredValue` and `operator`.
 * @param requiredValue The minimum/maximum threshold for success; Has to be equal to or between 0 and/or 1. 
 * @param operator The operator to use for calculation; default: `greater`.
 * @returns Whether the possibility is successful or not
 */
export function getPossibilitySuccessful(requiredValue: number, operator: MathOperator = "greater"): boolean {
    if (requiredValue < 0 || requiredValue > 1) throw new Error("requiredValue has to be equal to or between 0 and/or 1!")

    const randomNumber = Math.random();
    return calculatePossibility(randomNumber, requiredValue, operator);
}

export function setRandomWeaponLoadout(allowedTypes: boolean[], carePackageWeaponsAllowed: boolean, set: Setter<Weapon[] | null>): void {
    if (allowedTypes.length !== 5) throw new Error(getErrorMessage(allowedTypes, 5));
    const loadout: Weapon[] = [];
    const allWeapons: Weapon[] = [];

    for (let index = 0; index < allowedTypes.length; index++) {
        const weapons = weaponMap.get(index);
        if (weapons && allowedTypes[index]) {
            allWeapons.push(...weapons)
        }
    }

    if (carePackageWeaponsAllowed) for (const weapon of weaponMap.get(5)!) allWeapons.push(weapon);

    if (allWeapons.length === 0) {
        // There are no weapons to show, so why would we send an empty array back to the app if it accepts null?
        set(null);
        return;
    }

    for (let index = 0; index < 2; index++) {
        if (loadout.length < 2) {
            const addWeaponToLoadout = getPossibilitySuccessful(0.75, "lessOrEqual");
            if (addWeaponToLoadout) {
                const weapon = getRandomItemFromArray(allWeapons)
                loadout.push(weapon)
            } else loadout.push(addWeapon("None", "none", false, false))
        }
    }

    set(loadout);
}

export function invertArrayValue(index: number, set: Setter<boolean[]>): void {
    set(prev => {
        const newAllowedTypes = [...prev];
        newAllowedTypes[index] = !newAllowedTypes[index];
        return newAllowedTypes;
    });
}

export function invertValue(set: Setter<boolean>): void {
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
        default:
            return "None"
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
        case "unknown":
            return "Unknown-tier Loot";
        default:
            return "No Loot In Area";
    }
}

export function getMapArray(set: Setter<ApexMap[]> | null = null): ReadOnlyArray<ApexMap> {
    const mapArray = Array.from(allMaps.values());
    if (set) set(mapArray);
    return mapArray;
}

export function setLandingPoint(selectedMap: ApexMap | number, set: Setter<Location | null>, locationsOnMapOnly: boolean = false): void {
    const map = typeof selectedMap === "number" ? allMaps.get(selectedMap) : selectedMap;

    if (map) {
        const locations = locationsOnMapOnly ? map.locations.filter(location => location.shownOnMap === true) : map.locations;
        set(getRandomItemFromArray(locations));
    } else set(null);
}

export function getImagesKeys(from: keyof Images = "maps", set: Setter<string[] | null> | null = null): string[] | null {
    if (images[from]) {
        const keys = Object.keys(images[from]);
        if (set) set(keys);
        return keys;
    } else {
        if (set) set(null);
        return null;
    }
}
