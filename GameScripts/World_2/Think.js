let ThinkReqTxt = document.getElementById('ThinkReqTxt')
let ThinkResetBtn = document.getElementById('ThinkResetBtn')
let ThoughtsDisplayTxt = document.getElementById('ThoughtsDisplayTxt')
let ThinkEnergyDisplayTxt = document.getElementById('ThinkEnergyDisplayTxt')

// Think Energy boosts
let ThinkEnergyFirstBoostTxt = document.getElementById('ThinkEnergyFirstBoostTxt')


// Tabs
let ThinkEnergyTab = document.getElementById('ThinkEnergyTab')

// style
let MilestonesStyle = {
    borderColor: 'rgb(0, 255, 183)'
}

function calcThoughtsReq() {
    let scale = new OmegaNum(2.5)
    let base = new OmegaNum(300)
    if (hasMilestone('ThinkMilestone6', 'World2')) scale = scale.times(100)
    
    let req = base.times(OmegaNum.pow(scale, Data.Thoughts))

    return req
}

function calcThoughtsBulk() {
    let bulk = new OmegaNum(1)

    return bulk
}

function ThinkReset(force) {
    if (Data.Void.gte(calcThoughtsReq())) {
        if (!force) {
            Data.Thoughts = Data.Thoughts.add(calcThoughtsBulk())
        }

        resetStats(7,7)
        resetBuyables(10, 9)

        if (!Data.Unlocks.includes("Thoughts")) {
            Data.Unlocks.push('Thoughts')
        }
    }
}

function updateThinkHTML() {
    ThinkReqTxt.innerHTML = `You need ${format(calcThoughtsReq())} Void`
    ThinkResetBtn.innerHTML = (Data.Void.gte(calcThoughtsReq())) ? 'Think' : 'Meet the requirements'
    ThoughtsDisplayTxt.innerHTML = `Thinking Milestones [${format(Data.Thoughts)} Thoughts]`
    ThinkEnergyDisplayTxt.innerHTML = `Thinking Energy [${format(Data.ThinkingEnergy)} Thinking Energy [+${format(calcThinkingEnergyMult())}/s]]`

    // Tabs
    ThinkEnergyTab.style.display = (hasMilestone('ThinkMilestone3', 'World2')) ? 'inline-block' : 'none'

    // Think Energy boosts
    ThinkEnergyFirstBoostTxt.innerHTML = `x${format(calcThinkingEnergyVoidBoost())} Void`
    
    // Thinking Milestones
    achieveMilestone('ThinkMilestone1', 'Thoughts', new OmegaNum(1), undefined, 'World2', ThinkMilestone1, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone1', ThinkMilestone2, 'World2')
    achieveMilestone('ThinkMilestone2', 'Thoughts', new OmegaNum(2), undefined, 'World2', ThinkMilestone2, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone2', ThinkMilestone3, 'World2')
    achieveMilestone('ThinkMilestone3', 'Thoughts', new OmegaNum(3), undefined, 'World2', ThinkMilestone3, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone3', ThinkMilestone4, 'World2')
    achieveMilestone('ThinkMilestone4', 'Thoughts', new OmegaNum(4), undefined, 'World2', ThinkMilestone4, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone4', ThinkMilestone5, 'World2')
    achieveMilestone('ThinkMilestone5', 'Thoughts', new OmegaNum(8), undefined, 'World2', ThinkMilestone5, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone5', ThinkMilestone6, 'World2')
    achieveMilestone('ThinkMilestone6', 'Thoughts', new OmegaNum(9), undefined, 'World2', ThinkMilestone6, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone6', ThinkMilestone7, 'World2')
    achieveMilestone('ThinkMilestone7', 'Thoughts', new OmegaNum(12), undefined, 'World2', ThinkMilestone7, MilestonesStyle)

    unlockNextMilestone('ThinkMilestone7', ThinkMilestone8, 'World2')
    achieveMilestone('ThinkMilestone8', 'Thoughts', new OmegaNum(15), undefined, 'World2', ThinkMilestone8, MilestonesStyle)
}

function calcThinkingEnergyMult() {
    let mult = new OmegaNum(1)
    if (hasMilestone('ThinkMilestone4', 'World2')) mult = mult.times(2)
    if (hasMilestone('ThinkMilestone5', 'World2')) mult = mult.times(3.5)
    if (hasMilestone('ThinkMilestone7', 'World2')) mult = mult.times(2)
    
    return mult
}

function calcThinkingEnergyGen() {
    let can = false
    if (hasMilestone('ThinkMilestone3', 'World2')) can = true
    
    
    if (can) {
        Data.ThinkingEnergy = Data.ThinkingEnergy.add(calcThinkingEnergyMult())
    }
}

function calcThinkingEnergyVoidBoost() {
    let exp = new OmegaNum(0.05)
    let base = new OmegaNum(1)
    let boost = Data.ThinkingEnergy.add(base).pow(exp)
    
    return boost
}

setInterval(() => {
    calcThoughtsReq()
    calcThoughtsBulk()
    updateThinkHTML()
    calcThinkingEnergyMult()
    calcThinkingEnergyVoidBoost()
}, 100)

setInterval(() => {
    calcThinkingEnergyGen()
}, 1000)