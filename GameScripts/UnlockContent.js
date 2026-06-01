// Dream
let DreamifyTab = document.getElementById("DreamifyTab")
let DreamUpgsTab = document.getElementById("DreamUpgsTab")
// Rest
let RestResetTab = document.getElementById("RestResetTab")
// Lucid Dreams
let LucidityResetTab = document.getElementById("LucidityResetTab")
let LucidityUpgradesTab = document.getElementById("LucidityUpgradesTab")
// Infinitize
let InfinitizeResetTab = document.getElementById("InfinitizeResetTab")
let InfinitizeUpgsTab = document.getElementById("InfinitizeUpgsTab")
let InfinitizeChallengesTab = document.getElementById("InfinitizeChallengesTab")

function UnlockContent() {
    // Dream
    DreamifyTab.style.display = (Data.Upgrades.includes(1) || Data.Unlocks.includes("Dreamify")) ? "inline-block" : "none"
    DreamUpgsTab.style.display = (Data.Unlocks.includes("Dreamify")) ? "inline-block" : "none"
    // Rest
    RestResetTab.style.display = (Data.Upgrades.includes(2) || Data.Unlocks.includes("Rest")) ? "inline-block" : "none"
    // Lucidity
    LucidityResetTab.style.display = (Data.Rest.gte(30) || Data.Unlocks.includes("Lucidity")) ? "inline-block" : "none"
    LucidityUpgradesTab.style.display = (Data.Unlocks.includes("Lucidity")) ? "inline-block" : "none"
    // Infinitize
    InfinitizeResetTab.style.display = (Data.Memory.gte(Data.Caps.Memory.cap) || Data.Unlocks.includes("Infinitize")) ? "inline-block" : "none"
    InfinitizeUpgsTab.style.display = (Data.Unlocks.includes("Infinitize")) ? "inline-block" : "none"
    InfinitizeChallengesTab.style.display = (Data.Unlocks.includes("Infinitize")) ? "inline-block" : "none"
}

setInterval(() => {
    UnlockContent()
}, 100)