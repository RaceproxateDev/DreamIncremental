let calcPrestigeGainTxt = document.getElementById("CalcPrestigeGainTxt");
let prestigeRL = document.getElementById("PrestigeRLBtn");
let prestigeDisplayTxt = document.getElementById("PrestigeDisplayTxt");


function calcPrestigeMult() {
    let mult = new OmegaNum(1);
    if (Data.Upgrades.includes('#18')) mult = mult.times(1.25);
    
    return mult;
}

function calcPrestigeGain() {
    let exp = new OmegaNum(0.4);

    return Data.TrialsData.Shards.div(1e9).pow(exp).times(calcPrestigeMult());
}

function prestigeReset(force, noReq) {
    if (noReq || Data.TrialsData.Shards.gte(1e9)) {
        if (!force) {
            Data.TrialsData.PrestigePoints = Data.TrialsData.PrestigePoints.add(calcPrestigeGain());
        }

        Data.TrialsData.Shards = new OmegaNum(0);

        // Reset Upgrades
        Data.Upgrades = Data.Upgrades.filter(upg => {
            if (typeof upg === 'number') return true;

            if (typeof upg === 'string') {
                if (!upg.startsWith('#')) return true;

                let n = parseInt(upg.replace('#', ''), 10)
                if (isNaN(n)) return true;

                return n >= 11;
            };

            return false;
        });

        if (!Data.Unlocks.includes('Prestige')) {
            Data.Unlocks.push('Prestige');
        }
    }
}

function updateUpgTreeHtmlPrestige() {
    document.getElementById('TrialUpgrade#11').style.display = (Data.Unlocks.includes('Prestige')) ? 'block' : 'none';

    updateUpgTreeBuyables("#11", "#11CostTxt", ["TrialUpgrade#12", "TrialUpgrade#13"], "1 Prestige Point");
    updateUpgTreeBuyables("#12", "#12CostTxt", undefined, "2 Prestige Points");
    updateUpgTreeBuyables("#13", "#13CostTxt", "TrialUpgrade#14", "5 Prestige Points");
    updateUpgTreeBuyables("#14", "#14CostTxt", "TrialUpgrade#15", "20 Prestige Points");
    updateUpgTreeBuyables("#15", "#15CostTxt", ["TrialUpgrade#16", "TrialUpgrade#17"], "50 Prestige Points");
    updateUpgTreeBuyables("#16", "#16CostTxt", undefined, "10 Energy");
    updateUpgTreeBuyables("#17", "#17CostTxt", "TrialUpgrade#18", "30 Energy");
    updateUpgTreeBuyables("#18", "#18CostTxt", undefined, "100 Energy");
}

function updatePrestigeHtml() {
    prestigeDisplayTxt.innerHTML = `Prestige  [${format(Data.TrialsData.PrestigePoints)} Prestige Points]`;
    calcPrestigeGainTxt.innerHTML = `+${format(calcPrestigeGain())} Prestige Points`;
    prestigeRL.style.display = (Data.Unlocks.includes('Prestige') || Data.TrialsData.Shards.gte(1e9)) ? 'block' : 'none';

    // Upgrade Tree
    updateUpgTreeHtmlPrestige();
}

setInterval(() => {
    updatePrestigeHtml()
    calcPrestigeGain()
}, 100);