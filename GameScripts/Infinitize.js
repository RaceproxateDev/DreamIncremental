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

        if (!Data.Unlocks.includes("Infinitize")) {
            Data.Unlocks.push("Infinitize")
        }

        // resetting unlocks and automation

        Data.Unlocks = Data.Unlocks.slice(Data.Unlocks.indexOf('Infinitize'))
    }
}

setInterval(() => {
    calcInfDreamsMult()
    calcInfinityDreamGain()
    updateInfDreamsHTML()
}, 100)