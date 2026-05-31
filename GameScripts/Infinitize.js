let InfinityDreamsCalcGainTxt = document.getElementById("InfinityDreamsCalcGainTxt")
let InfinitiesDisplayTxt = document.getElementById("InfinitiesDisplayTxt")
let InfinitizeRLBtn = document.getElementById("InfinitizeRLBtn")

// Infinity Milestones
let InfinityMilestone1 = document.getElementById("InfinityMilestone1")

function calcInfDreamsMult() {
    let mult = new OmegaNum(1)

    return mult
}

function calcInfinityDreamGain() {
    let gain = Data.Memory.div(1.79e308).times(calcInfDreamsMult())

    return gain
}

function calcInfinitiesDone() {
    let bulk = new OmegaNum(1)

    return bulk
}

function updateInfDreamsHTML() {
    InfinitizeRLBtn.textContent = (Data.Memory.gte(1.79e308)) ? "Infinitize" : "You need 1.79e308 Memories"
    InfinityDreamsCalcGainTxt.textContent = `In return, +${format(calcInfinityDreamGain())} Infinity Dreams`
    InfinitiesDisplayTxt.textContent = `Infinitize [${format(Data.Infinities)} Infinities]`

    // Infinity Milestones
    InfinityMilestone1.style.borderColor = (Data.Infinities.gte(1)) ? "lightgreen" : "red"

}

function InfinitizeReset(force) {
    if (Data.Memory.gte(1.79e308)) {
        if (!force) {
            Data.InfinityDreams = Data.InfinityDreams.add(calcInfinityDreamGain())
            Data.Infinities = Data.Infinities.add(calcInfinitiesDone())
        }

        resetStats(4, 0)
        resetBuyables(7, 1)

        if (!Data.Unlocks.includes("Infinitize")) {
            Data.Unlocks.push("Infinitize")
        }

        // resetting unlocks and automation
        Data.Unlocks = resetArrays(Data.Unlocks, 'Infinitize')
        Data.Automation = resetArrays(Data.Automation, 'AutobuyInfDreamUpgrades')
        Data.Upgrades = resetArrays(Data.Upgrades, 4)
    }
}

setInterval(() => {
    calcInfDreamsMult()
    calcInfinityDreamGain()
    updateInfDreamsHTML()
    calcInfinitiesDone()
}, 100)