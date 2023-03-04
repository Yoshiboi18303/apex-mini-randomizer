const legendMap = new Map<number, string[]>([
    [0, ["Bangalore", "Revenant", "Fuse", "Ash", "Mad Maggie"]], // Assault
    [1, ["Pathfinder", "Wraith", "Mirage", "Octane", "Horizon", "Valkyrie"]], // Skirmisher
    [2, ["Bloodhound", "Crypto", "Seer", "Vantage"]], // Recon
    [3, ["Gibraltar", "Lifeline", "Loba", "Newcastle"]], // Support
    [4, ["Caustic", "Wattson", "Rampart", "Catalyst"]] // Controller
]);
const legendTypes = ["Assault", "Skirmisher", "Recon", "Support", "Controller"];

export function getRandomLegend(allowedTypes: boolean[]): string | null {
    if (allowedTypes.length !== 5) throw new Error(`Invalid number of allowed types\n\nRequired: 5\nFound: ${allowedTypes.length}`);

    const legends: string[] = [];

    for (let index = 0; index < allowedTypes.length; index++) {
        const legendArray = legendMap.get(index);
        if (legendArray) {
            legends.push(...legendArray);
        }
    }

    let selectedLegend: string | null = null;

    if (legends.length > 0) {
        selectedLegend = legends[Math.floor(Math.random() * legends.length)];
    }

    return selectedLegend;
}

export function getLegendType(index: number): string | null {
    if (index < 0 || index >= legendTypes.length) return null;
    return legendTypes[index];
}
