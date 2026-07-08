let calcPrestigeGainTxt = document.getElementById("CalcPrestigeGainTxt");
let prestigeRL = document.getElementById("PrestigeRLBtn");
let prestigeDisplayTxt = document.getElementById("PrestigeDisplayTxt");


function calcPrestigeMult() {
    let mult = new OmegaNum(1);
    
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
        Data.Upgrades = Data.Upgrades.filter(upgrade => {
            let n = parseInt(upgrade.slice(1))
            return n >= 11
        })

        if (!Data.Unlocks.includes('Prestige')) {
            Data.Unlocks.push('Prestige');
        }
    }
}

function updateUpgTreeHtmlPrestige() {
    document.getElementById('TrialUpgrade#11').style.display = (Data.Unlocks.includes('Prestige')) ? 'block' : 'none';

    updateUpgTreeBuyables("#11", "#11CostTxt", ["TrialUpgrade#12", "TrialUpgrade#13"], "1 Prestige Point");
    updateUpgTreeBuyables("#12", "#12CostTxt", undefined, "2 Prestige Points");
    updateUpgTreeBuyables("#13", "#13CostTxt", undefined, "5 Prestige Points");
    
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