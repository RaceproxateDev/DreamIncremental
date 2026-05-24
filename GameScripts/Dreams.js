let CalcDreamsGainTxt = document.getElementById("CalcDreamsGainTxt")
let DreamifyResetBtn = document.getElementById("DreamifyResetBtn")

function calcDreamGain() {
    let exp = 0.6
    let gain = Data.Memory.div(10000).pow(exp).times(calcDreamMult())

    return gain
}

function calcDreamMult() {
    let mult = new OmegaNum(1)

    return mult
}

function updateDreamHtml() {
    
}