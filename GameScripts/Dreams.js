let CalcDreamsGainTxt = document.getElementById("CalcDreamsGainTxt")
let DreamifyResetBtn = document.getElementById("DreamifyResetBtn")

// Upgrades
let DreamsDisplayTxt = document.getElementById("DreamsDisplayTxt")

let DreamBuyable1Btn = document.getElementById("DreamBuyable1Btn")
let DreamBuyable2Btn = document.getElementById("DreamBuyable2Btn")

function calcDreamMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(OmegaNum.add(1, Data.Buyables[4].amount.times(0.5)))

    return mult
}

function calcDreamGain() {
    let exp = 0.6
    let gain = Data.Memory.div(10000).pow(exp).times(calcDreamMult())

    return gain
}

function updateDreamHtml() {
    CalcDreamsGainTxt.textContent = `+${format(calcDreamGain())} Dreams on Reset`
    DreamifyResetBtn.textContent = (Data.Memory.gte(10000)) ? "Dreamify" : "You need 10,000 Memories"

    // Upgrades
    DreamsDisplayTxt.textContent = `Dream Upgrades [${format(Data.Dreams)} Dreams]`

    DreamBuyable1Btn.innerHTML = `1.5x Memories [${format(Data.Buyables[3].amount)}/${format(Data.Buyables[3].max)}] <br> ${format(Data.Buyables[3].price)} Dreams`
    DreamBuyable2Btn.innerHTML = `+50% Dreams [${format(Data.Buyables[4].amount)}/${format(Data.Buyables[4].max)}] <br> ${format(Data.Buyables[4].price)} Dreams`
}

function DreamReset(force) {
    if (Data.Memory.gte(10000)) {
        if (!force) {
            Data.Dreams = Data.Dreams.add(calcDreamGain())
        }

        resetStats(0, 0)
        resetBuyables(1, 0)

        if (!Data.Unlocks.includes("Dreamify")) {
            Data.Unlocks.push("Dreamify")
        }
    }
}


setInterval(() => {
    calcDreamGain()
    calcDreamMult()
    updateDreamHtml()
})