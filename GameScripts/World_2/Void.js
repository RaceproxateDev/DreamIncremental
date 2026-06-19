let voidDisplayTxt = document.getElementById("voidDisplayTxt")

// Void Upgrades
let VoidBuyable1 = document.getElementById("VoidBuyable1")
let VoidBuyable2 = document.getElementById("VoidBuyable2")
let VoidUpgrade1 = document.getElementById("VoidUpgrade1")

function calcVoidDivision() {
    let exp = new OmegaNum(0.8)
    exp = exp.sub(OmegaNum.times(0.03, Data.Buyables[10].amount))
    if (hasMilestone('ThinkMilestone2', 'World2')) exp = exp.sub(0.01)
    if (hasMilestone('ThinkMilestone5', 'World2')) exp = exp.sub(0.14)
    if (hasMilestone('ThinkMilestone6', 'World2')) exp = new OmegaNum(0)
    let effect = Data.Void.add(1).pow(exp)

    return effect
}

function calcVoidMult() {
    let mult = new OmegaNum(1)
    mult = mult.div(calcVoidDivision())
    mult = mult.times(OmegaNum.pow(3, Data.Buyables[9].amount))
    if (hasMilestone('ThinkMilestone1', 'World2')) mult = mult.times(3)
    mult = mult.times(calcThinkingEnergyVoidBoost())
    if (hasMilestone('ThinkMilestone4', 'World2')) mult = mult.times(5)
    if (hasMilestone('ThinkMilestone7', 'World2')) mult = mult.times(10)
    if (hasMilestone('ThinkMilestone9', 'World2')) mult = mult.pow(1.1)
    return mult
}

function genVoid() {
    let can = false
    if (Data.isInWorld === 'world2') can = true

    if (can) {
        Data.Void = Data.Void.add(calcVoidMult())
    }
}

function updateVoidHTML() {
    voidDisplayTxt.textContent = `Void: ${format(Data.Void)} [+${format(calcVoidMult())}/s] [/${format(calcVoidDivision())}]`

    // Void Buyables
    VoidBuyable1.innerHTML = `3x Void [${format(Data.Buyables[9].amount)}/${format(Data.Buyables[9].max)}] <br> ${format(Data.Buyables[9].price)} Void`
    VoidBuyable2.innerHTML = `-^0.03 Void divider [${format(Data.Buyables[10].amount)}/${format(Data.Buyables[10].max)}] <br> ${format(Data.Buyables[10].price)} Void`
    VoidUpgrade1.innerHTML = (Data.Upgrades.includes('V1')) ? `Unlock Toughts [1/1] [Permanent] <br> Bought!` : `Unlock Toughts [0/1] [Permanent] <br> 300 Void`

    VoidBuyable2.style.display = (hasMilestone('ThinkMilestone6', 'World2')) ? 'none' : 'inline-block'
}

function autoBuyVoidUpgrades() {
    if (!Data.isInWorld === 'world2') return;

    if (hasMilestone('ThinkMilestone8', 'World2') && !Data.Automation.includes('VoidUpgsAutobuyer')) {
        Data.Automation.push('VoidUpgsAutobuyer')
    }
    
    if (!Data.Automation.includes('VoidUpgsAutobuyer')) return;
    
    if (Data.Settings.VoidUpgsAutobuyer == true) {
        buyMaxUpg(9, 'Void')
    }
}

setInterval(() => {
    genVoid()
}, 1000)

setInterval(() => {
    updateVoidHTML()
    calcVoidMult()
    calcVoidDivision()
    autoBuyVoidUpgrades()
}, 100)