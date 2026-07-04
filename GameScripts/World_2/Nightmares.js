let NightmareReqTxt = document.getElementById("NightmareReqTxt");
let NightmareResetBtn = document.getElementById("NightmaresResetBtn");

// style
let NightmareMilestonesStyle = {
    borderColor: 'darkmagenta'
}
// ------ //

function calcNightmareReq() {
    let req = new OmegaNum(1e56);
    req = req.times(OmegaNum.pow(1.5, Data.Nightmares))

    return req;
}

function calcNightmareBulk() {
    let bulk = new OmegaNum(1);
    
    return bulk;
}

function updateNightmareHtml() {
    NightmareReqTxt.innerHTML = `You need ${format(calcNightmareReq())} Void`;
    NightmareResetBtn.innerHTML = (Data.Void.gte(calcNightmareReq())) ? "Nightmare" : "Not enough Void";
    NightmareDisplayTxt.innerHTML = `Nightmare Milestones [${format(Data.Nightmares)} Nightmares]`;

    achieveMilestone('NightmareMilestone1', 'Nightmares', new OmegaNum(1), undefined, 'World2', NightmareMilestone1, NightmareMilestonesStyle)
    
    achieveMilestone('NightmareMilestone2', 'Nightmares', new OmegaNum(2), undefined, 'World2', NightmareMilestone2, NightmareMilestonesStyle)
    unlockNextMilestone('NightmareMilestone2', NightmareMilestone3, 'World2')
}

function NightmareReset(force) {
    if (Data.Void.gte(calcNightmareReq())) {
        if (!force) {
            Data.Nightmares = Data.Nightmares.add(calcNightmareBulk())
        }
        
        resetStats(9, 0);
        resetBuyables(10, 1);

        Data.Automation = resetArrays(Data.Automation, 'AutoThink')
        Data.Unlocks = resetArrays(Data.Unlocks, 'Nightmares')
        Data.Milestones.World2 = resetArrays(Data.Milestones.World2, 'NightmareMilestone1')
        Data.Upgrades = resetArrays(Data.Upgrades, '#1')

        Data.isInWorld = 'world1'
        displayWorlds('world1')

        if (!Data.Unlocks.includes('Nightmares')) {
            Data.Unlocks.push('Nightmares')
        }
    }
}

setInterval(() => {
    calcNightmareReq();
    updateNightmareHtml();
}, 100)