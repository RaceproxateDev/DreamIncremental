let LucidifyGainTxt = document.getElementById("LucidifyGainTxt")
let LucidifyResetBtn = document.getElementById("LucidifyResetBtn")

function calcLucidDreamMult() {
    let mult = new OmegaNum(1)

    return mult
}

function calcLucidDreamGain() {
    let exp = new OmegaNum(0.05)
    let gain = Data.Dreams.div(1e50).pow(exp).times(calcLucidDreamMult())

    return gain
}

function updateLucidDreamsHtml() {
    LucidifyGainTxt.textContent = `+${format(calcLucidDreamGain())} Lucid Dreams`
    LucidifyResetBtn.textContent = (Data.Dreams.gte(1e50)) ? "Lucidify" : "You need 1e50 Dreams"
}

function LucidDreamReset(force) {
    if (Data.Dreams.gte(1e50)) {
        if (!force) {
            Data.LucidDreams = Data.LucidDreams.add(calcLucidDreamGain())
        }

        resetStats(2,0)
        resetBuyables(4,1)

        if (!Data.Unlocks.includes("Lucidity")) {
            Data.Unlocks.push("Lucidity")
        }
    }
}

setInterval(() => {
    updateLucidDreamsHtml()
    calcLucidDreamGain()
    calcLucidDreamMult()
}, 100)