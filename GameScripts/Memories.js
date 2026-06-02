let canGenMemory = true;

let MemoryDisplayTxt = document.getElementById("MemoriesDisplayTxt")

// Buyables
let MemoryBuyable1Btn = document.getElementById("MemoryBuyable1Btn")
let MemoryBuyable2Btn = document.getElementById("MemoryBuyable2Btn")
let MemoryUpgrade1Btn = document.getElementById("MemoryUpgrade1Btn")

function calcMemoryMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(Data.Buyables[1].amount.add(1))
    mult = mult.times(OmegaNum.pow(2, Data.Buyables[2].amount))
    mult = mult.times(OmegaNum.pow(1.5, Data.Buyables[3].amount))
    if (Data.Rest.gte(1)) mult = mult.times(2)
    if (Data.Rest.gte(3)) mult = mult.times(5)
    if (Data.Rest.gte(4)) mult = mult.times(10)
    if (Data.Rest.gte(20)) mult = mult.times(3)
    if (Data.Rest.gte(21)) mult = mult.times(10)
    mult = mult.times(OmegaNum.pow(5, Data.Buyables[5].amount))
    if (Data.LucidEnergy.gte(1000)) mult = mult.times(10)
    if (Data.LucidEnergy.gte(50000)) mult = mult.times(50)
    if (Data.LucidEnergy.gte(50000000)) mult = mult.times(333.3)
    if (Data.LucidEnergy.gte(1e18)) mult = mult.times(10000)
    if (Data.LucidEnergy.gte(1e27)) mult = mult.pow(1.25)
    if (Data.LucidEnergy.gte(2e92)) mult = mult.pow(1.25)
    if (Data.Infinities.gte(1)) mult = mult.times(3)
    mult = mult.times(OmegaNum.pow(10, Data.Buyables[8].amount))
    if (Data.Infinities.gte(2)) mult = mult.times(10)
    if (isInChallenge('Memory Deficiency I')) mult = mult.pow(0.6)
    if (hasChallenge('Memory Deficiency I')) mult = mult.times(3)
    if (Data.Infinities.gte(5)) mult = mult.times(10)

    return mult
}

function calcCanGenMemory() {
    if (Data.Memory.gte(Data.Caps.Memory.cap) && Data.Caps.Memory.broken === false) { 
        canGenMemory = false
        Data.Memory = new OmegaNum(Data.Caps.Memory.cap)
    } else {
        canGenMemory = true
    }
}

function GenMemory() {
    if (canGenMemory) {
        Data.Memory = Data.Memory.add(calcMemoryMult())
    }
}

function UpdateMemoryHtml() {
    MemoryDisplayTxt.textContent = `Memory: ${format(Data.Memory)} [+${(canGenMemory === true) ? format(calcMemoryMult()) : new OmegaNum(0)}/s]`

    // Memory Buyables
    MemoryBuyable1Btn.innerHTML = `+100% Memories [${format(Data.Buyables[1].amount)}/${format(Data.Buyables[1].max)}] <br> ${format(Data.Buyables[1].price)} Memories`
    MemoryBuyable2Btn.innerHTML = `2x Memories [${format(Data.Buyables[2].amount)}/${format(Data.Buyables[2].max)}] <br> ${format(Data.Buyables[2].price)} Memories`
    MemoryUpgrade1Btn.innerHTML = (Data.Upgrades.includes(1)) ? `Unlock Dreams [1/1] [Permanent] <br> Bought!` : `Unlock Dreams [0/1] [Permanent] <br> 1,000 Memories`
}

function calcMaxMemoryBuyable2() {
    let max = new OmegaNum(50)
    if (Data.Rest.gte(24)) max = max.add(100)

    Data.Buyables[2].max = max
    return max
}

setInterval(() => {
    GenMemory()
}, 1000)

setInterval(() => {
    calcMemoryMult()
    UpdateMemoryHtml()
    calcMaxMemoryBuyable2()
    calcCanGenMemory()
}, 10)