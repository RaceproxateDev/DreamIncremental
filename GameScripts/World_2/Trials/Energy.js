let EnergyTab = document.getElementById('EnergyTab');
let EnergyDisplayTxt = document.getElementById('EnergyDisplayTxt');
let SuperEnergyDisplayTxt = document.getElementById('SuperEnergyDisplayTxt');


function calcEnergyMult() {
    let mult = new OmegaNum(1).div(5);
    if (Data.Upgrades.includes('#17')) mult = mult.times(2);
    if (Data.Upgrades.includes('#19')) mult = mult.times(4);
    if (Data.Upgrades.includes('#26')) mult = mult.times(3);
    if (Data.Upgrades.includes('#27')) mult = mult.times(10);
    if (hasMilestone('AscensionMilestone2', 'Trials')) mult = mult.times(10);
    mult = mult.times(calcSuperEnergyBoostEnergy());
    
    return mult;
}

function calcSuperEnergyMult() {
    let mult = new OmegaNum(1).div(5);
    if (hasMilestone('AscensionMilestone6', 'Trials')) mult = mult.times(10);
    
    return mult;
}

function GenerateEnergy() {
    let can = false;
    if (Data.Upgrades.includes('#15')) can = true;

    if (can) {
        Data.TrialsData.Energy = Data.TrialsData.Energy.add(calcEnergyMult());
    }
}

function GenerateSuperEnergy() {
    let can = false;
    if (hasMilestone('AscensionMilestone4', 'Trials') && Data.Upgrades.includes('#15')) can = true;

    if (can) {
        Data.TrialsData.SuperEnergy = Data.TrialsData.SuperEnergy.add(calcSuperEnergyMult());
    }
}

function calcSuperEnergyBoostEnergy() {
    let exp = new OmegaNum(0.35);

    return OmegaNum.add(1, Data.TrialsData.SuperEnergy.pow(exp));
}

function updateEnergyHtml() {
    EnergyTab.style.display = (Data.Upgrades.includes('#15')) ? 'inline-block' : 'none';
    EnergyDisplayTxt.textContent = `Energy: ${format(Data.TrialsData.Energy)} [+${format(calcEnergyMult().times(5))}/s]`;

    SuperEnergyDisplayTxt.style.display = (hasMilestone('AscensionMilestone4', 'Trials') && Data.Upgrades.includes('#15')) ? 'inline-block' : 'none';
    SuperEnergyDisplayTxt.textContent = `Super Energy: ${format(Data.TrialsData.SuperEnergy)} [+${format(calcSuperEnergyMult().times(5))}/s] [${format(calcSuperEnergyBoostEnergy())}x Energy]`;
}

setInterval(() => {
    GenerateEnergy();
    GenerateSuperEnergy();
}, 1000/5);

setInterval(() => {
    updateEnergyHtml();
    calcEnergyMult();
    calcSuperEnergyMult();
    calcSuperEnergyBoostEnergy();
}, 100)