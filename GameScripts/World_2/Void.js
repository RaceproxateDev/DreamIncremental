let voidDisplayTxt = document.getElementById("voidDisplayTxt")

function calcVoidDivision() {
    let exp = new OmegaNum(0.8)
    let effect = Data.Void.add(1).pow(exp)

    return effect
}

function calcVoidMult() {
    let mult = new OmegaNum(1)
    mult = mult.div(calcVoidDivision())

    return mult
}

function genVoid() {
    let can = true

    if (can) {
        Data.Void = Data.Void.add(calcVoidMult())
    }
}

function updateVoidHTML() {
    voidDisplayTxt.textContent = `Void: ${format(Data.Void)} [+${format(calcVoidMult())}/s] [/${format(calcVoidDivision())}]`
}

setInterval(() => {
    genVoid()
}, 1000)

setInterval(() => {
    updateVoidHTML()
    calcVoidMult()
    calcVoidDivision()
}, 100)