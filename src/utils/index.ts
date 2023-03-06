import React from "react";

export interface Legend {
    name: string;
    infoURL: string;
}

type AmmoType = "light" | "heavy" | "energy" | "sniper" | "shotgun" | "mythic";

export const ammoTypes: string[] = ["Light", "Heavy", "Energy", "Sniper", "Shotgun"]

export interface Weapon {
    name: string;
    infoURL: string;
    ammoType: AmmoType;
    isCarePackageWeapon: boolean;
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

const legendTypes = ["Assault", "Skirmisher", "Recon", "Support", "Controller"];

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
