let MemoryDisplayTxt = document.getElementById("MemoriesDisplayTxt")

function calcMemoryMult() {
    let mult = new OmegaNum(1)

    return mult
}

function GenMemory() {
    let can = true;

    if (can) {
        Data['tier0'].Memory = Data['tier0'].Memory.add(calcMemoryMult())
    }
}

function UpdateMemoryHtml() {
    MemoryDisplayTxt.textContent = `Memory: ${format(Data['tier0'].Memory)} [+${format(calcMemoryMult())}/s]`
}

setInterval(() => {
    GenMemory()
}, 1000)

setInterval(() => {
    calcMemoryMult()
    UpdateMemoryHtml()
}, 100)