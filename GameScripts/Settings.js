let MemoryUpgsAutobuyerEnabler = document.getElementById("MemoryUpgsAutobuyerEnabler")
let dreamUpgsAutobuyerEnabler = document.getElementById("DreamUpgsAutobuyerEnabler")
let autoRestEnabler = document.getElementById("AutoRestEnabler")

// World 2
let voidUpgsAutobuyEnabler = document.getElementById("VoidUpgsAutobuyEnabler")

// Trial World
let shardUpgsAutobuyerEnabler = document.getElementById("ShardsUpgsAutobuyEnabler")
let prestigeUpgsAutobuyerEnabler = document.getElementById("PrestigeUpgsAutobuyEnabler")

let ExitTrial1Tab = document.getElementById("ExitTrial1Tab")

// Teleports
let TeleportSTitle = document.getElementById("TeleportSTitle")
let TeleportSTitle2 = document.getElementById("TeleportSTitle2")
let W2Teleporter = document.getElementById("TeleportWorld2")
let W1Teleporter = document.getElementById("TeleportWorld1")

function enableDisable(automation) {
    Data.Settings[automation] = !Data.Settings[automation]
}

function updateHtmlSettings() {
    MemoryUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("MemoryUpgs")) ? "inline-block" : "none"
    MemoryUpgsAutobuyerEnabler.textContent = (Data.Settings.MemoryUpgsAutobuyer == true) ? "Memory Upgrades Autobuyer: ON" : "Memory Upgrades Autobuyer: OFF"

    dreamUpgsAutobuyerEnabler.style.display = (Data.Automation.includes("DreamUpgs")) ? "inline-block" : "none"
    dreamUpgsAutobuyerEnabler.textContent = (Data.Settings.DreamUpgsAutobuyer == true) ? "Dream Upgrades Autobuyer: ON" : "Dream Upgrades Autobuyer: OFF"
    
    autoRestEnabler.style.display = (Data.Automation.includes("AutoRest")) ? "inline-block" : "none"
    autoRestEnabler.textContent = (Data.Settings.AutoRest == true) ? "Auto Rest: ON" : "Auto Rest: OFF"

    TeleportSTitle.style.display = (hasMilestone('NightmareMilestone4', 'World2')) ? "inline-block" : "none"
    W2Teleporter.style.display = (hasMilestone('NightmareMilestone4', 'World2')) ? "inline-block" : "none"

    TeleportSTitle2.style.display = (hasMilestone('NightmareMilestone4', 'World2')) ? "inline-block" : "none"
    W1Teleporter.style.display = (hasMilestone('NightmareMilestone4', 'World2')) ? "inline-block" : "none"

    shardUpgsAutobuyerEnabler.style.display = (Data.TrialsData.Automation.includes("ShardsUpgAutobuy")) ? "inline-block" : "none"
    shardUpgsAutobuyerEnabler.textContent = (Data.Settings.TrialShardUpgradesAutobuyer == true) ? "Shards Upgrades Autobuyer: ON" : "Shards Upgrades Autobuyer: OFF"

    prestigeUpgsAutobuyerEnabler.style.display = (Data.TrialsData.Automation.includes("PrestigeUpgsAutobuyer")) ? "inline-block" : "none"
    prestigeUpgsAutobuyerEnabler.textContent = (Data.Settings.TrialPrestigeUpgradesAutobuyer == true) ? "Prestige Upgrades Autobuyer: ON" : "Prestige Upgrades Autobuyer: OFF"

    ExitTrial1Tab.style.display = (Data.TrialsData.Shards.gte('1e10000')) ? "inline-block" : "none"
}

function updateHtmlSettingsW2() {
    voidUpgsAutobuyEnabler.style.display = (Data.Automation.includes("VoidUpgsAutobuyer")) ? "inline-block" : "none"
    voidUpgsAutobuyEnabler.textContent = (Data.Settings.VoidUpgsAutobuyer == true) ? "Auto Buy Void Upgrades: ON" : "Auto Buy Void Upgrades: OFF"
}

setInterval(() => {
    updateHtmlSettings()
    updateHtmlSettingsW2()
}, 100)