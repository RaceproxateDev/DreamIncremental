// Dream
let DreamifyTab = document.getElementById("DreamifyTab")
let DreamUpgsTab = document.getElementById("DreamUpgsTab")

function UnlockContent() {
    DreamifyTab.style.display = (Data.Upgrades.includes(1) || Data.Unlocks.includes("Dreamify")) ? "inline-block" : "none"
    DreamUpgsTab.style.display = (Data.Unlocks.includes("Dreamify")) ? "inline-block" : "none"
}

setInterval(() => {
    UnlockContent()
}, 100)