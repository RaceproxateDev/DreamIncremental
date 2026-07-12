let AscensionDisplayTxt = document.getElementById("AscensionDisplayTxt");
let AscensionReqTxt = document.getElementById("AscensionReqTxt");
let AscensionTab = document.getElementById("AscensionTab");
let AscensionResetBtn = document.getElementById("AscensionResetBtn");

// Milestones
let milestonesDesign = {
    borderColor: 'lightgreen',
}

function calcAscensionBulk() {
    let bulk = new OmegaNum(1);

    return bulk;
}

function calcAscensionReq() {
    let baseR = new OmegaNum(12)
    let s = new OmegaNum(1.5)
    let ascensionReq = baseR.times(OmegaNum.pow(s, Data.TrialsData.AscensionPoints))
    
    return ascensionReq;
}

function updateAscensionHtml() {
    AscensionDisplayTxt.innerHTML = `Ascend [Ascension Points: ${format(Data.TrialsData.AscensionPoints)}]`;
    AscensionReqTxt.innerHTML = `${format(calcAscensionReq())} Rebirth Points`;
    AscensionTab.style.display = (Data.Unlocks.includes('Ascension') || Data.Upgrades.includes('#30')) ? 'inline-block' : 'none';
    AscensionResetBtn.innerHTML = (Data.TrialsData.RebirthPoints.gte(calcAscensionReq())) ? 'Ascend' : 'Meet the requirements';

    // Milestones
    achieveMilestone('AscensionMilestone1', 'AscensionPoints', new OmegaNum(1), undefined, 'Trials', AscensionMilestone1, milestonesDesign, Data.TrialsData)
    achieveMilestone('AscensionMilestone2', 'AscensionPoints', new OmegaNum(2), undefined, 'Trials', AscensionMilestone2, milestonesDesign, Data.TrialsData)
}

function AscensionReset(force, noReq) {
    if (noReq || Data.TrialsData.RebirthPoints.gte(calcAscensionReq())) {    
        if (!force) {
            Data.TrialsData.AscensionPoints = Data.TrialsData.AscensionPoints.add(calcAscensionBulk())
        }   

        RebirthReset(true, true)

        Data.TrialsData.RebirthPoints = new OmegaNum(0);

        // Reset Upgrades
        Data.Upgrades = Data.Upgrades.filter(upg => {
            if (typeof upg === 'number') return true;

            if (typeof upg === 'string') {
                if (!upg.startsWith('#')) return true;

                let n = parseInt(upg.replace('#', ''), 10)
                if (isNaN(n)) return true;

                return n >= 31;
            }
        })

        if (!Data.Unlocks.includes('Ascension')) {
            Data.Unlocks.push('Ascension');
        }
    }
}


setInterval(() => {
    updateAscensionHtml();
    calcAscensionBulk();
    calcAscensionReq();
}, 100)