let LucidifyGainTxt = document.getElementById("LucidifyGainTxt")
let LucidifyResetBtn = document.getElementById("LucidifyResetBtn")
let LucidDreamsDisplayTxt = document.getElementById("LucidDreamsDisplayTxt")

// Lucid Dream Upgrades
let LucidDreamBuyable1 = document.getElementById("LucidDreamBuyable1")
let LucidDreamBuyable2 = document.getElementById("LucidDreamBuyable2")
let LucidDreamBuyable3 = document.getElementById("LucidDreamBuyable3")
let LucidDreamUpgrade1 = document.getElementById("LucidDreamUpgrade1")

// content
let LucidEnergyContent = document.getElementById("LucidEnergyContent")
let LucidEnergyTxtDisplay = document.getElementById("LucidEnergyTxtDisplay")

// Lucid Energy Milestones
let LucidEnergyMilestone1 = document.getElementById("LucidEnergyMilestone1")
let LucidEnergyMilestone2 = document.getElementById("LucidEnergyMilestone2")
let LucidEnergyMilestone3 = document.getElementById("LucidEnergyMilestone3")
let LucidEnergyMilestone4 = document.getElementById("LucidEnergyMilestone4")
let LucidEnergyMilestone5 = document.getElementById("LucidEnergyMilestone5")
let LucidEnergyMilestone6 = document.getElementById("LucidEnergyMilestone6")
let LucidEnergyMilestone7 = document.getElementById("LucidEnergyMilestone7")
let LucidEnergyMilestone8 = document.getElementById("LucidEnergyMilestone8")
let LucidEnergyMilestone9 = document.getElementById("LucidEnergyMilestone9")
let LucidEnergyMilestone10 = document.getElementById("LucidEnergyMilestone10")
let LucidEnergyMilestone11 = document.getElementById("LucidEnergyMilestone11")

function calcLucidDreamMult() {
    let mult = new OmegaNum(1)
    if (Data.LucidEnergy.gte(500)) mult = mult.times(1.25)
    if (Data.LucidEnergy.gte(1e47)) mult = mult.times(10)
    if (Data.Infinities.gte(1)) mult = mult.times(OmegaNum.add(1, Data.Infinities))
    if (Data.Infinities.gte(2)) mult = mult.times(1.5)
    if (hasMilestone('NightmareMilestone2')) mult = mult.div(1.5)
    
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

    // content
    LucidEnergyContent.style.display = (Data.Upgrades.includes(3)) ? "inline-block" : "none"
    LucidEnergyTxtDisplay.innerHTML = `Lucid Energy Milestones [${format(Data.LucidEnergy)} Lucid Energy [+${format(calcLucidEnergyMult())}/s]]`

    // Lucid Energy Milestones
    LucidEnergyMilestone1.style.borderColor = (Data.LucidEnergy.gte(25)) ? "lightgreen" : "orange"

    LucidEnergyMilestone2.style.display = (Data.LucidEnergy.gte(25)) ? 'block' : 'none'
    LucidEnergyMilestone2.style.borderColor = (Data.LucidEnergy.gte(100)) ? "lightgreen" : "orange"

    LucidEnergyMilestone3.style.display = (Data.LucidEnergy.gte(100)) ? 'block' : 'none'
    LucidEnergyMilestone3.style.borderColor = (Data.LucidEnergy.gte(500)) ? "lightgreen" : "orange"

    LucidEnergyMilestone4.style.display = (Data.LucidEnergy.gte(500)) ? 'block' : 'none'
    LucidEnergyMilestone4.style.borderColor = (Data.LucidEnergy.gte(1000)) ? "lightgreen" : "orange"

    LucidEnergyMilestone5.style.display = (Data.LucidEnergy.gte(1000)) ? 'block' : 'none'
    LucidEnergyMilestone5.style.borderColor = (Data.LucidEnergy.gte(50000)) ? "lightgreen" : "orange"

    LucidEnergyMilestone6.style.display = (Data.LucidEnergy.gte(50000)) ? 'block' : 'none'
    LucidEnergyMilestone6.style.borderColor = (Data.LucidEnergy.gte(50000000)) ? "lightgreen" : "orange"

    LucidEnergyMilestone7.style.display = (Data.LucidEnergy.gte(50000000)) ? 'block' : 'none'
    LucidEnergyMilestone7.style.borderColor = (Data.LucidEnergy.gte(1e10)) ? "lightgreen" : "orange"

    LucidEnergyMilestone8.style.display = (Data.LucidEnergy.gte(1e10)) ? 'block' : 'none'
    LucidEnergyMilestone8.style.borderColor = (Data.LucidEnergy.gte(1e18)) ? "lightgreen" : "orange"

    LucidEnergyMilestone9.style.display = (Data.LucidEnergy.gte(1e18)) ? 'block' : 'none'
    LucidEnergyMilestone9.style.borderColor = (Data.LucidEnergy.gte(1e27)) ? "lightgreen" : "orange"

    LucidEnergyMilestone10.style.display = (Data.LucidEnergy.gte(1e27)) ? 'block' : 'none'
    LucidEnergyMilestone10.style.borderColor = (Data.LucidEnergy.gte(1e47)) ? "lightgreen" : "orange"

    LucidEnergyMilestone11.style.display = (Data.LucidEnergy.gte(1e47)) ? 'block' : 'none'
    LucidEnergyMilestone11.style.borderColor = (Data.LucidEnergy.gte(2e92)) ? "lightgreen" : "orange"
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

function calcLucidEnergyMult() {
    let mult = new OmegaNum(1)
    if (Data.LucidEnergy.gte(25)) mult = mult.times(2)
    if (Data.LucidEnergy.gte(100)) mult = mult.times(10)
    if (Data.LucidEnergy.gte(1000)) mult = mult.times(100)
    if (Data.LucidEnergy.gte(50000)) mult = mult.times(1000)
    if (Data.LucidEnergy.gte(50000000)) mult = mult.pow(1.3)
    if (Data.LucidEnergy.gte(1e10)) mult = mult.pow(2)
    if (Data.LucidEnergy.gte(1e18)) mult = mult.times(1e9)
    if (Data.LucidEnergy.gte(1e27)) mult = mult.times(1e20)
    if (Data.LucidEnergy.gte(1e47)) mult = mult.times(1e45)
    if (Data.LucidEnergy.gte(2e92)) mult = mult.times(1e100)
    if (Data.Infinities.gte(3)) mult = mult.times(2)
    if (Data.Infinities.gte(4)) mult = mult.times(5)
    if (Data.Infinities.gte(6)) mult = mult.times(10)

    return mult
}

function GenLucidEnergy() {
    let can = false

    if (Data.Upgrades.includes(3)) can = true

    if (can) {
        Data.LucidEnergy = Data.LucidEnergy.add(calcLucidEnergyMult())
    }
}

setInterval(() => {
    updateLucidDreamsHtml()
    calcLucidDreamGain()
    calcLucidDreamMult()
    calcLucidEnergyMult()
}, 100)

setInterval(() => {
    GenLucidEnergy()
}, 1000)