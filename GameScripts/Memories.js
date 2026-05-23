let MemoryDisplayTxt = document.getElementById("MemoriesDisplayTxt")

function calcMemoryMult() {
    let mult = new OmegaNum(1)

    return mult
}

function GenMemory() {
    let can = true;

    if (can) {
        Data.Memory = Data.Memory.add(calcMemoryMult())
    }
}

function UpdateMemoryHtml() {
    MemoryDisplayTxt.textContent = `Memory: ${format(Data.Memory)} [+${format(calcMemoryMult())}/s]`
}

setInterval(() => {
    GenMemory()
}, 1000)

setInterval(() => {
    calcMemoryMult()
    UpdateMemoryHtml()
}, 100)