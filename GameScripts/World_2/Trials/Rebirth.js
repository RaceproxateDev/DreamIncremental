let RebirthRLBtn = document.getElementById("RebirthRLBtn");
let RebirthDisplayTxt = document.getElementById("RebirthDisplayTxt");
let CalcRebirthGainTxt = document.getElementById("CalcRebirthGainTxt");

function CalcRebirthMult() {
    let mult = new OmegaNum(1);
    if (Data.Upgrades.includes('#28')) mult = mult.times(1.5)
    
    return mult
}

function calcRebirthGain() {
    let exp = new OmegaNum(0.25)
    let gain = Data.TrialsData.PrestigePoints.div(800).pow(exp).times(CalcRebirthMult())

    return gain
}

function RebirthReset(force, noReq) {
    if (Data.TrialsData.PrestigePoints.gte(800) || noReq) {
        if (!force) {
            Data.TrialsData.RebirthPoints = Data.TrialsData.RebirthPoints.add(calcRebirthGain())
        }
        
        prestigeReset(true, true)

        Data.TrialsData.PrestigePoints = new OmegaNum(0)
        Data.TrialsData.Energy = new OmegaNum(0)

        // Reset Upgrades
        Data.Upgrades = Data.Upgrades.filter(upg => {
            if (typeof upg === 'number') return true;

            if (typeof upg === 'string') {
                if (!upg.startsWith('#')) return true;

                let n = parseInt(upg.replace('#', ''), 10)
                if (isNaN(n)) return true;

                return n >= 22;
            }
        })

        if (!Data.Unlocks.includes('Rebirth')) {
            Data.Unlocks.push('Rebirth');
        }
    }
}

function updateTreeHtml() {
    document.getElementById('TrialUpgrade#22').style.display = (Data.Unlocks.includes('Rebirth')) ? 'block' : 'none'

    updateUpgTreeBuyables('#22', '#22CostTxt', ["TrialUpgrade#23", "TrialUpgrade#24"], '1 Rebirth Point')
    updateUpgTreeBuyables('#23', '#23CostTxt', undefined, '2 Rebirth Points')
    updateUpgTreeBuyables('#24', '#24CostTxt', ["TrialUpgrade#25", "TrialUpgrade#26"], '3 Rebirth Points')
    updateUpgTreeBuyables('#25', '#25CostTxt', undefined, '5 Rebirth Points')
    updateUpgTreeBuyables('#26', '#26CostTxt', ["TrialUpgrade#27", "TrialUpgrade#28", "TrialUpgrade#29"], '5 Rebirth Points')
    updateUpgTreeBuyables('#27', '#27CostTxt', undefined, '5 Rebirth Points')
    updateUpgTreeBuyables('#28', '#28CostTxt', undefined, '5 Rebirth Points')
    updateUpgTreeBuyables('#29', '#29CostTxt', "TrialUpgrade#30", '8 Rebirth Points')
    updateUpgTreeBuyables('#30', '#30CostTxt', undefined, '10 Rebirth Points')
    
}

function updateRebirthHtml() {
    RebirthDisplayTxt.innerHTML = `Rebirth [${format(Data.TrialsData.RebirthPoints)} Rebirth Points]`
    CalcRebirthGainTxt.innerHTML = `+${format(calcRebirthGain())} Rebirth Points`

    RebirthRLBtn.style.display = (Data.Unlocks.includes('Rebirth') || Data.TrialsData.PrestigePoints.gte(800) || Data.Upgrades.includes('#21')) ? 'block' : 'none'

    // Tree Upgrades
    updateTreeHtml()
}

setInterval(() => {
    CalcRebirthMult()
    calcRebirthGain()
    updateRebirthHtml()
}, 100)