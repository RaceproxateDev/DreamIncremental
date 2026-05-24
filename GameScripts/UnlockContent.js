let DreamifyTab = document.getElementById("DreamifyTab")

function UnlockContent() {
    DreamifyTab.style.display = (Data.Upgrades.includes(1) || Data.Unlocks.includes("Dreamify")) ? "inline-block" : "none"
}

setInterval(() => {
    UnlockContent()
}, 100)