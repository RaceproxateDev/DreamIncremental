let EnergyTab = document.getElementById('EnergyTab');
let EnergyDisplayTxt = document.getElementById('EnergyDisplayTxt');

function calcEnergyMult() {
    let mult = new OmegaNum(1).div(5);
    if (Data.Upgrades.includes('#17')) mult = mult.times(2);
    if (Data.Upgrades.includes('#19')) mult = mult.times(4);
    if (Data.Upgrades.includes('#26')) mult = mult.times(3);
    if (Data.Upgrades.includes('#27')) mult = mult.times(10);
    if (hasMilestone('AscensionMilestone2', 'Trials')) mult = mult.times(10);
    
    return mult;
}

function GenerateEnergy() {
    let can = false;
    if (Data.Upgrades.includes('#15')) can = true;

    if (can) {
        Data.TrialsData.Energy = Data.TrialsData.Energy.add(calcEnergyMult());
    }
}

function updateEnergyHtml() {
    EnergyTab.style.display = (Data.Upgrades.includes('#15')) ? 'inline-block' : 'none';
    EnergyDisplayTxt.textContent = `Energy: ${format(Data.TrialsData.Energy)} [+${format(calcEnergyMult().times(5))}/s]`;
}

setInterval(() => {
    GenerateEnergy();
}, 1000/5);

setInterval(() => {
    updateEnergyHtml();
    calcEnergyMult();
}, 100)