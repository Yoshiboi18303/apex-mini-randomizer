const assaultLegends: string[] = [
    "Bangalore",
    "Revenant",
    "Fuse",
    "Ash",
    "Mad Maggie"
];
const skirmisherLegends: string[] = [
    "Pathfinder",
    "Wraith",
    "Mirage",
    "Octane",
    "Horizon",
    "Valkyrie"
];
const reconLegends: string[] = [
    "Bloodhound",
    "Crypto",
    "Seer",
    "Vantage"
];
const supportLegends: string[] = [
    "Gibraltar",
    "Lifeline",
    "Loba",
    "Newcastle"
];
const controllerLegends: string[] = [
    "Caustic",
    "Wattson",
    "Rampart",
    "Catalyst"
];

export function getRandomLegend(allowedTypes: boolean[]): string | null {
    if (allowedTypes.length !== 5) throw new Error(`Invalid number of allowed types\n\nRequired: 5\nFound: ${allowedTypes.length}`);

    let index = 0;
    const legends: string[] = [];

    while (index < 5) {
        if (allowedTypes[index]) {
            switch (index) {
                case 0:
                    for (const legend of assaultLegends) {
                        legends.push(legend);
                    }
                    break;
                case 1:
                    for (const legend of skirmisherLegends) {
                        legends.push(legend);
                    }
                    break;
                case 2:
                    for (const legend of reconLegends) {
                        legends.push(legend);
                    }
                    break;
                case 3:
                    for (const legend of supportLegends) {
                        legends.push(legend);
                    }
                    break;
                case 4:
                    for (const legend of controllerLegends) {
                        legends.push(legend);
                    }
                    break;
            }
        }
        index += 1;
    }

    let selectedLegend: string | null = null;

    if (legends.length > 0) {
        selectedLegend = legends[Math.floor(Math.random() * legends.length)];
    }

    return selectedLegend;
}

export function getLegendType(index: number): string | null {
    switch (index) {
        case 0:
            return "Assault";
        case 1:
            return "Skirmisher";
        case 2:
            return "Recon";
        case 3:
            return "Support";
        case 4:
            return "Controller";
        default:
            return null;
    }
}
