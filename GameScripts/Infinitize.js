let InfinityDreamsCalcGainTxt = document.getElementById("InfinityDreamsCalcGainTxt")
let InfinitiesDisplayTxt = document.getElementById("InfinitiesDisplayTxt")
let InfinitizeRLBtn = document.getElementById("InfinitizeRLBtn")

// Infinity Milestones
let InfinityMilestone1 = document.getElementById("InfinityMilestone1")
let InfinityMilestone2 = document.getElementById("InfinityMilestone2")
let InfinityMilestone3 = document.getElementById("InfinityMilestone3")

// Infinity Upgrades
let InfDreamsDisplayTxt = document.getElementById("InfDreamsDisplayTxt")
let InfinityDreamsBuyable1 = document.getElementById("InfinityDreamsBuyable1")

// Infinity Challenges
let InfinityChallenge1 = document.getElementById("InfinityChallenge1")
let InfChallenge1txt = document.getElementById("InfChallenge1txt")

function calcInfDreamsMult() {
    let mult = new OmegaNum(1)

    return mult
}

function calcInfinityDreamGain() {
    let gain = Data.Memory.div(1.79e308).times(calcInfDreamsMult())

    return gain
}

function calcInfinitiesDone() {
    let bulk = new OmegaNum(1)

    return bulk
}

function updateInfDreamsHTML() {
    InfinitizeRLBtn.textContent = (Data.Memory.gte(1.79e308)) ? "Infinitize" : "You need 1.79e308 Memories"
    InfinityDreamsCalcGainTxt.textContent = `In return, +${format(calcInfinityDreamGain())} Infinity Dreams`
    InfinitiesDisplayTxt.textContent = `Infinitize [${format(Data.Infinities)} Infinities]`

    // Infinity Milestones
    InfinityMilestone1.style.borderColor = (Data.Infinities.gte(1)) ? "lightgreen" : "red"
    InfinityMilestone2.style.borderColor = (Data.Infinities.gte(2)) ? "lightgreen" : "red"
    InfinityMilestone3.style.borderColor = (Data.Infinities.gte(3)) ? "lightgreen" : "red"

    // Infinity Upgrades
    InfDreamsDisplayTxt.innerHTML = `Infinity Dream Upgrades [${format(Data.InfinityDreams)} Infinity Dreams]`
    InfinityDreamsBuyable1.innerHTML = `10x Memories, 8x Dreams [${format(Data.Buyables[8].amount)}/${format(Data.Buyables[8].max)}] <br> ${format(Data.Buyables[8].price)} Infinity Dreams`

    // Infinity Challenges
    InfChallenge1txt.innerHTML = (hasChallenge('Memory Deficiency I')) ? 'Challenge Completed' : 'Start Challenge'
    if (!hasChallenge('Memory Deficiency I') && !isInChallenge('Memory Deficiency I')) InfChallenge1txt.innerHTML = 'Start Challenge'
    if (!hasChallenge('Memory Deficiency I') && canCompleteChallenge('Memory Deficiency I', 1.79e308, 'Memory')) InfChallenge1txt.innerHTML = 'Complete Challenge'
    if (isInChallenge('Memory Deficiency I') && !hasChallenge('Memory Deficiency I')) InfChallenge1txt.innerHTML = 'Exit Challenge'
}

function InfinitizeReset(force, noReq) {
    if (Data.Memory.gte(1.79e308) || noReq) {
        if (!force) {
            Data.InfinityDreams = Data.InfinityDreams.add(calcInfinityDreamGain())
            Data.Infinities = Data.Infinities.add(calcInfinitiesDone())
        }

        resetStats(4, 0)
        resetBuyables(7, 1)

        if (!Data.Unlocks.includes("Infinitize")) {
            Data.Unlocks.push("Infinitize")
        }

        // resetting unlocks and automation
        Data.Unlocks = resetArrays(Data.Unlocks, 'Infinitize')
        Data.Automation = resetArrays(Data.Automation, 'AutobuyInfDreamUpgrades')
        Data.Upgrades = resetArrays(Data.Upgrades, 4)
    }
}

setInterval(() => {
    calcInfDreamsMult()
    calcInfinityDreamGain()
    updateInfDreamsHTML()
    calcInfinitiesDone()
}, 100)