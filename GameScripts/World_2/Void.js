let voidDisplayTxt = document.getElementById("voidDisplayTxt")

// Void Upgrades
let VoidBuyable1 = document.getElementById("VoidBuyable1")
let VoidBuyable2 = document.getElementById("VoidBuyable2")

function calcVoidDivision() {
    let exp = new OmegaNum(0.8)
    exp = exp.sub(OmegaNum.times(0.01, Data.Buyables[10].amount))
    let effect = Data.Void.add(1).pow(exp)

    return effect
}

function calcVoidMult() {
    let mult = new OmegaNum(1)
    mult = mult.div(calcVoidDivision())
    mult = mult.times(OmegaNum.pow(2, Data.Buyables[9].amount))

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
    VoidBuyable1.innerHTML = `2x Void [${format(Data.Buyables[9].amount)}/${format(Data.Buyables[9].max)}] <br> ${format(Data.Buyables[9].price)} Void`
    VoidBuyable2.innerHTML = `-^0.01 Void divider [${format(Data.Buyables[10].amount)}/${format(Data.Buyables[10].max)}] <br> ${format(Data.Buyables[10].price)} Void`
}

setInterval(() => {
    genVoid()
}, 1000)

setInterval(() => {
    updateVoidHTML()
    calcVoidMult()
    calcVoidDivision()
}, 100)