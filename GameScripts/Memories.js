let MemoryDisplayTxt = document.getElementById("MemoriesDisplayTxt")

// Buyables
let MemoryBuyable1Btn = document.getElementById("MemoryBuyable1Btn")
let MemoryBuyable2Btn = document.getElementById("MemoryBuyable2Btn")
let MemoryUpgrade1Btn = document.getElementById("MemoryUpgrade1Btn")

function calcMemoryMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(Data.Buyables[1].amount.add(1))
    mult = mult.times(OmegaNum.pow(2, Data.Buyables[2].amount))

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

    // Memory Buyables
    MemoryBuyable1Btn.innerHTML = `+100% Memories [${format(Data.Buyables[1].amount)}/${format(Data.Buyables[1].max)}] <br> ${format(Data.Buyables[1].price)} Memories`
    MemoryBuyable2Btn.innerHTML = `2x Memories [${format(Data.Buyables[2].amount)}/${format(Data.Buyables[2].max)}] <br> ${format(Data.Buyables[2].price)} Memories`
    MemoryUpgrade1Btn.innerHTML = (Data.Upgrades.includes(1)) ? `Unlock Dreams [1/1] <br> Bought!` : `Unlock Dreams [0/1] <br> 1,000 Memories`
}

setInterval(() => {
    GenMemory()
}, 1000)

setInterval(() => {
    calcMemoryMult()
    UpdateMemoryHtml()
}, 100)