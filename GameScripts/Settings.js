let shardUpgsAutobuyerEnabler = document.getElementById("MemoryUpgsAutobuyerEnabler")
let dreamUpgsAutobuyerEnabler = document.getElementById("DreamUpgsAutobuyerEnabler")
let autoRestEnabler = document.getElementById("AutoRestEnabler")

// World 2
let voidUpgsAutobuyEnabler = document.getElementById("VoidUpgsAutobuyEnabler")

function enableDisable(automation) {
    Data.Settings[automation] = !Data.Settings[automation]
}

function updateHtmlSettings() {
    shardUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("MemoryUpgs")) ? "inline-block" : "none"
    shardUpgsAutobuyerEnabler.textContent = (Data.Settings.MemoryUpgsAutobuyer == true) ? "Memory Upgrades Autobuyer: ON" : "Memory Upgrades Autobuyer: OFF"

    dreamUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("DreamUpgs")) ? "inline-block" : "none"
    dreamUpgsAutobuyerEnabler.textContent = (Data.Settings.DreamUpgsAutobuyer == true) ? "Dream Upgrades Autobuyer: ON" : "Dream Upgrades Autobuyer: OFF"
    
    autoRestEnabler.style.display = (Data.Automation.includes("AutoRest")) ? "inline-block" : "none"
    autoRestEnabler.textContent = (Data.Settings.AutoRest == true) ? "Auto Rest: ON" : "Auto Rest: OFF"
}

function updateHtmlSettingsW2() {
    voidUpgsAutobuyEnabler.style.display = (Data.Automation.includes("VoidUpgsAutobuyer")) ? "inline-block" : "none"
    voidUpgsAutobuyEnabler.textContent = (Data.Settings.VoidUpgsAutobuyer == true) ? "Auto Buy Void Upgrades: ON" : "Auto Buy Void Upgrades: OFF"
}

setInterval(() => {
    updateHtmlSettings()
    updateHtmlSettingsW2()
}, 100)