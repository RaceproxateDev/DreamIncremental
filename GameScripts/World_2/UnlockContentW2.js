// Thoughts
let ThinkResetTab = document.getElementById("ThinkResetTab")
// Nightmare
let NightmareResetTab = document.getElementById("NightmareResetTab")
let NightmareTrialsTab = document.getElementById("NightmareTrialsTab")

function updateW2HtmlUnlock() {
    ThinkResetTab.style.display = (Data.Upgrades.includes('V1')) ? 'inline-block' : 'none'
    NightmareResetTab.style.display = (hasMilestone('ThinkMilestone9', 'World2') || Data.Unlocks.includes('Nightmares')) ? 'inline-block' : 'none'
    NightmareTrialsTab.style.display = (hasMilestone('NightmareMilestone4', 'World2')) ? 'inline-block' : 'none'
}

setInterval(() => {
    updateW2HtmlUnlock()
}, 100)