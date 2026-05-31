let InfinityDreamsCalcGainTxt = document.getElementById("InfinityDreamsCalcGainTxt")

function calcInfDreamsMult() {
    let mult = new OmegaNum(1)

    return mult
}

function calcInfinityDreamGain() {
    let gain = Data.Memory.div(1.79e308).times(calcInfDreamsMult())

    return gain
}

function updateInfDreamsHTML() {
    InfinityDreamsCalcGainTxt.textContent = `In return, +${format(calcInfinityDreamGain())} Infinity Dreams`
}

function InfinitizeReset(force) {
    if (Data.Memory.gte(1.79e308)) {
        if (!force) {
            Data.InfinityDreams = Data.InfinityDreams.add(calcInfinityDreamGain())
        }

        resetStats(4, 0)
        resetBuyables(7, 1)

        // resetting unlocks and automation
        


        if (!Data.Unlocks.includes("Infinitize")) {
            Data.Unlocks.push("Infinitize")
        }
    }
}

setInterval(() => {
    calcInfDreamsMult()
    calcInfinityDreamGain()
    updateInfDreamsHTML()
}, 100)