let shardUpgsAutobuyerEnabler = document.getElementById("MemoryUpgsAutobuyerEnabler")
let dreamUpgsAutobuyerEnabler = document.getElementById("DreamUpgsAutobuyerEnabler")

function enableDisable(automation) {
    Data.Settings[automation] = !Data.Settings[automation]
}

function updateHtmlSettings() {
    shardUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("MemoryUpgs")) ? "inline-block" : "none"
    shardUpgsAutobuyerEnabler.textContent = (Data.Settings.MemoryUpgsAutobuyer == true) ? "Memory Upgrades Autobuyer: ON" : "Memory Upgrades Autobuyer: OFF"

    dreamUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("DreamUpgs")) ? "inline-block" : "none"
    dreamUpgsAutobuyerEnabler.textContent = (Data.Settings.DreamUpgsAutobuyer == true) ? "Dream Upgrades Autobuyer: ON" : "Dream Upgrades Autobuyer: OFF"
}

setInterval(() => {
    updateHtmlSettings()
}, 100)