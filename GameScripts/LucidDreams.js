let LucidifyGainTxt = document.getElementById("LucidifyGainTxt")
let LucidifyResetBtn = document.getElementById("LucidifyResetBtn")
let LucidDreamsDisplayTxt = document.getElementById("LucidDreamsDisplayTxt")

// Lucid Dream Upgrades
let LucidDreamBuyable1 = document.getElementById("LucidDreamBuyable1")
let LucidDreamBuyable2 = document.getElementById("LucidDreamBuyable2")
let LucidDreamBuyable3 = document.getElementById("LucidDreamBuyable3")
let LucidDreamUpgrade1 = document.getElementById("LucidDreamUpgrade1")

function calcLucidDreamMult() {
    let mult = new OmegaNum(1)

    return mult
}

function calcLucidDreamGain() {
    let exp = new OmegaNum(0.2)
    let gain = Data.Dreams.div(1e50).pow(exp).times(calcLucidDreamMult())

    return gain
}

function updateLucidDreamsHtml() {
    LucidifyGainTxt.textContent = `+${format(calcLucidDreamGain(), 2)} Lucid Dreams`
    LucidifyResetBtn.textContent = (Data.Dreams.gte(1e50)) ? "Lucidify" : "You need 1e50 Dreams"

    // Lucid Dream Upgrades
    LucidDreamsDisplayTxt.textContent = `Lucid Dream Upgrades [${format(Data.LucidDreams)} Lucid Dreams]`
    LucidDreamBuyable1.innerHTML = `5x Memories [${format(Data.Buyables[5].amount)}/${format(Data.Buyables[5].max)}] <br> ${format(Data.Buyables[5].price)} Lucid Dreams`
    LucidDreamBuyable2.innerHTML = `3x Dreams [${format(Data.Buyables[6].amount)}/${format(Data.Buyables[6].max)}] <br> ${format(Data.Buyables[6].price)} Lucid Dreams`
    LucidDreamBuyable3.innerHTML = `+1 Rest bulk [${format(Data.Buyables[7].amount)}/${format(Data.Buyables[7].max)}] <br> ${format(Data.Buyables[7].price)} Lucid Dreams`
    LucidDreamUpgrade1.innerHTML = (Data.Upgrades.includes(3)) ? `Unlock Lucid Energy [1/1] <br> Bought!` : `Unlock Lucid Energy [0/1] <br> 5 Lucid Dreams`
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