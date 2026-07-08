let EnergyTab = document.getElementById('EnergyTab');

function calcEnergyMult() {
    let mult = new OmegaNum(1);
    
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
}

setInterval(() => {
    GenerateEnergy();
}, 1000);

setInterval(() => {
    updateEnergyHtml();
    calcEnergyMult();
}, 100)