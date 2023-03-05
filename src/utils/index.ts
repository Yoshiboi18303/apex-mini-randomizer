export interface Legend {
    name: string;
    infoURL: string;
}

function getWikiURL(legendName: string): string {
    return "https://apexlegends.fandom.com/wiki/" + legendName.replace(" ", "_");
}

function addLegend(legendName: string): Legend {
    return {
        name: legendName,
        infoURL: getWikiURL(legendName)
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

export function getRandomLegend(allowedTypes: boolean[]): Legend | null {
    if (allowedTypes.length !== 5) throw new Error(`Invalid number of allowed types\n\nRequired: 5\nFound: ${allowedTypes.length}`);

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
