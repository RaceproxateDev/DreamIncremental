// Thoughts
let ThinkResetTab = document.getElementById("ThinkResetTab")
let NightmareResetTab = document.getElementById("NightmareResetTab")

function updateW2HtmlUnlock() {
    ThinkResetTab.style.display = (Data.Upgrades.includes('V1')) ? 'inline-block' : 'none'
    NightmareResetTab.style.display = (hasMilestone('ThinkMilestone9', 'World2') || Data.Unlocks.includes('Nightmares')) ? 'inline-block' : 'none'
}

setInterval(() => {
    updateW2HtmlUnlock()
}, 100)