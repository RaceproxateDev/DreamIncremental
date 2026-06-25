let CalcDreamsGainTxt = document.getElementById("CalcDreamsGainTxt")
let DreamifyResetBtn = document.getElementById("DreamifyResetBtn")

// Upgrades
let DreamsDisplayTxt = document.getElementById("DreamsDisplayTxt")

let DreamBuyable1Btn = document.getElementById("DreamBuyable1Btn")
let DreamBuyable2Btn = document.getElementById("DreamBuyable2Btn")
let DreamUpgrade1Btn = document.getElementById("DreamUpgrade1Btn")

function calcDreamMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(OmegaNum.add(1, Data.Buyables[4].amount.times(0.5)))
    if (Data.Rest.gte(1)) mult = mult.times(1.5)
    if (Data.Rest.gte(2)) mult = mult.times(OmegaNum.add(1, OmegaNum.times(0.25, Data.Rest.div(2))))
    if (Data.Rest.gte(3)) mult = mult.times(2)
    if (Data.Rest.gte(20)) mult = mult.times(3)
    if (Data.Rest.gte(21)) mult = mult.times(5)
    mult = mult.times(OmegaNum.pow(3, Data.Buyables[6].amount))
    if (Data.LucidEnergy.gte(50000)) mult = mult.times(50)
    if (Data.LucidEnergy.gte(1e47)) mult = mult.times(100)
    if (Data.Infinities.gte(1)) mult = mult.times(2.5)
    mult = mult.times(OmegaNum.pow(8, Data.Buyables[8].amount))
    if (Data.Infinities.gte(5)) mult = mult.times(5)
    if (Data.Infinities.gte(8)) mult = mult.pow(3.5)
    if (isInChallenge('Forgotten')) mult = mult.pow(0.4)
    if (hasChallenge('Forgotten')) mult = mult.times(10)
    if (hasMilestone('NightmareMilestone1', 'World2')) mult = mult.div(3)

    return mult
}

function calcDreamGain() {
    let exp = new OmegaNum(0.6)
    let base = new OmegaNum(10000)
    if (hasMilestone('NightmareMilestone1', 'World2')) base = base.sub(2000)
    if (hasMilestone('NightmareMilestone1', 'World2')) exp = exp.add(0.05)
    let gain = Data.Memory.div(base).pow(exp).times(calcDreamMult())

    return gain
}

function updateDreamHtml() {
    CalcDreamsGainTxt.textContent = `+${format(calcDreamGain())} Dreams on Reset`
    DreamifyResetBtn.textContent = (Data.Memory.gte(10000)) ? "Dreamify" : "You need 10,000 Memories"

    // Upgrades
    DreamsDisplayTxt.textContent = `Dream Upgrades [${format(Data.Dreams)} Dreams]`

    DreamBuyable1Btn.innerHTML = `1.5x Memories [${format(Data.Buyables[3].amount)}/${format(Data.Buyables[3].max)}] <br> ${format(Data.Buyables[3].price)} Dreams`
    DreamBuyable2Btn.innerHTML = `+50% Dreams [${format(Data.Buyables[4].amount)}/${format(Data.Buyables[4].max)}] <br> ${format(Data.Buyables[4].price)} Dreams`
    DreamUpgrade1Btn.innerHTML = (Data.Upgrades.includes(2)) ? `Unlock Rest [1/1] [Permanent] <br> Bought!` : `Unlock Rest [0/1] [Permanent] <br> 100 Dreams`
}

function DreamReset(force) {
    let reset = true
    if (Data.Infinities.gte(2)) reset = false

    if (Data.Memory.gte(10000)) {
        if (!force) {
            Data.Dreams = Data.Dreams.add(calcDreamGain())
        }

        if (reset) {
            resetStats(0, 0)
            resetBuyables(2, 1)
        }

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