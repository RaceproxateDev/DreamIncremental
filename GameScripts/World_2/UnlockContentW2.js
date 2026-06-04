// Thoughts
let ThinkResetTab = document.getElementById("ThinkResetTab")

function updateW2HtmlUnlock() {
    ThinkResetTab.style.display = (Data.Upgrades.includes('V1')) ? 'inline-block' : 'none'
}

setInterval(() => {
    updateW2HtmlUnlock()
}, 100)