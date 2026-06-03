let InfinityDreamsCalcGainTxt = document.getElementById("InfinityDreamsCalcGainTxt")
let InfinitiesDisplayTxt = document.getElementById("InfinitiesDisplayTxt")
let InfinitizeRLBtn = document.getElementById("InfinitizeRLBtn")

// Infinity Milestones
let InfinityMilestone1 = document.getElementById("InfinityMilestone1")
let InfinityMilestone2 = document.getElementById("InfinityMilestone2")
let InfinityMilestone3 = document.getElementById("InfinityMilestone3")
let InfinityMilestone4 = document.getElementById("InfinityMilestone4")
let InfinityMilestone5 = document.getElementById("InfinityMilestone5")
let InfinityMilestone6 = document.getElementById("InfinityMilestone6")
let InfinityMilestone7 = document.getElementById("InfinityMilestone7")
let InfinityMilestone8 = document.getElementById("InfinityMilestone8")
// Infinity Upgrades
let InfDreamsDisplayTxt = document.getElementById("InfDreamsDisplayTxt")
let InfinityDreamsBuyable1 = document.getElementById("InfinityDreamsBuyable1")

// worlds
let worldSection = document.getElementById("worldsSection")

function calcInfDreamsMult() {
    let mult = new OmegaNum(1)
    if (Data.Infinities.gte(10)) mult = mult.times(1.5)

    return mult
}

function calcInfinityDreamGain() {
    let exp = new OmegaNum(0.05)
    let gain = Data.Memory.div(new OmegaNum('1.79e308')).pow(exp).times(calcInfDreamsMult())

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
    InfinityMilestone4.style.borderColor = (Data.Infinities.gte(5)) ? "lightgreen" : "red"
    InfinityMilestone5.style.borderColor = (Data.Infinities.gte(6)) ? "lightgreen" : "red"
    InfinityMilestone6.style.borderColor = (Data.Infinities.gte(8)) ? "lightgreen" : "red"

    InfinityMilestone7.style.display = (Data.Infinities.gte(8)) ? "block" : "none"
    InfinityMilestone7.style.borderColor = (Data.Infinities.gte(10)) ? "lightgreen" : "red"

    InfinityMilestone8.style.display = (Data.Infinities.gte(10)) ? "block" : "none"
    InfinityMilestone8.style.borderColor = (Data.Infinities.gte(13)) ? "lightgreen" : "red"
    // Infinity Upgrades
    InfDreamsDisplayTxt.innerHTML = `Infinity Dream Upgrades [${format(Data.InfinityDreams)} Infinity Dreams]`
    InfinityDreamsBuyable1.innerHTML = `10x Memories, 8x Dreams [${format(Data.Buyables[8].amount)}/${format(Data.Buyables[8].max)}] <br> ${format(Data.Buyables[8].price)} Infinity Dreams`

    // Infinity Challenges
    updateChallengeHTML('Memory Deficiency I', InfChallenge1txt, 'Memory', new OmegaNum('1.79e308'), InfinityChallenge1)
    unlockNewChallenges(InfinityChallenge2, 'Memory Deficiency I')
    updateChallengeHTML('Forgotten', InfChallenge2txt, 'Memory', new OmegaNum('1.79e308'), InfinityChallenge2)

    // worlds
    worldSection.style.display = (Data.Infinities.gte(10)) ? "block" : "none"
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

function autoRest() {
    if (Data.Infinities.gte(5) && Data.Settings.AutoRest) {
        RestReset(false)
    }
}

function completeInfinityChallenges() {
    completeChallenge('Memory Deficiency I', new OmegaNum(1.79e308), 'Memory')
    completeChallenge('Forgotten', new OmegaNum(1.79e308), 'Memory');
}

function breakInfinity() {
    if (Data.Infinities.gte(10)) {
        breakCaps('Memory')
    }
}

setInterval(() => {
    calcInfDreamsMult()
    calcInfinityDreamGain()
    updateInfDreamsHTML()
    calcInfinitiesDone()
    autoRest()
    completeInfinityChallenges()
    breakInfinity()
}, 100)