let RestsDisplayTxt = document.getElementById("RestsDisplayTxt")
let RestReqTxt = document.getElementById("RestReqTxt")
let RestResetBtn = document.getElementById("RestResetBtn")

// Rest milestones
let RestMilestone1 = document.getElementById("RestMilestone1")
let RestMilestone2 = document.getElementById("RestMilestone2")
let RestMilestone3 = document.getElementById("RestMilestone3")
let RestMilestone4 = document.getElementById("RestMilestone4")
let RestMilestone5 = document.getElementById("RestMilestone5")
let RestMilestone6 = document.getElementById("RestMilestone6")
let RestMilestone7 = document.getElementById("RestMilestone7")
let RestMilestone8 = document.getElementById("RestMilestone8")
let RestMilestone9 = document.getElementById("RestMilestone9")
let RestMilestone10 = document.getElementById("RestMilestone10")

function calcRestReq() {
    let scale = new OmegaNum(3)
    let Breq = new OmegaNum(100)

    if (Data.Rest.gte(13)) scale = scale.times(1.5)
    if (Data.Rest.gte(20)) scale = scale.times(1.6)
    if (Data.Rest.gte(30)) scale = scale.times(1e100)

    let req = Breq.times(OmegaNum.pow(scale, Data.Rest))

    return req
}

function calcRestGain() {
    let bulk = new OmegaNum(1)
    bulk = bulk.add(Data.Buyables[7].amount)
    if (Data.Infinities.gte(1)) bulk = bulk.add(1)
    if (Data.Infinities.gte(8)) bulk = bulk.add(2)
    if (hasMilestone('NightmareMilestone2', 'World2') && Data.Rest.lt(6)) bulk = bulk.times(3)

    return bulk
}

function UpdateRestHtml() {
    RestsDisplayTxt.textContent = `Rest Milestones [Rests: ${format(Data.Rest)}]`
    RestReqTxt.textContent = `You need ${format(calcRestReq())} Dreams`
    RestResetBtn.textContent = (Data.Dreams.gte(calcRestReq())) ? `Rest` : `Meet the requirement to Rest`

    // Rest Milestones
    RestMilestone1.style.borderColor = (Data.Rest.gte(1)) ? "lightgreen" : "blue"

    RestMilestone2.style.display = (Data.Rest.gte(1)) ? "block" : "none"
    RestMilestone2.style.borderColor = (Data.Rest.gte(2)) ? "lightgreen" : "blue"

    RestMilestone3.style.display = (Data.Rest.gte(2)) ? "block" : "none"
    RestMilestone3.style.borderColor = (Data.Rest.gte(3)) ? "lightgreen" : "blue"

    RestMilestone4.style.display = (Data.Rest.gte(3)) ? "block" : "none"
    RestMilestone4.style.borderColor = (Data.Rest.gte(4)) ? "lightgreen" : "blue"

    RestMilestone5.style.display = (Data.Rest.gte(4)) ? "block" : "none"
    RestMilestone5.style.borderColor = (Data.Rest.gte(8)) ? "lightgreen" : "blue"

    RestMilestone6.style.display = (Data.Rest.gte(8)) ? "block" : "none"
    RestMilestone6.style.borderColor = (Data.Rest.gte(13)) ? "lightgreen" : "blue"

    RestMilestone7.style.display = (Data.Rest.gte(13)) ? "block" : "none"
    RestMilestone7.style.borderColor = (Data.Rest.gte(20)) ? "lightgreen" : "blue"

    RestMilestone8.style.display = (Data.Rest.gte(20)) ? "block" : "none"
    RestMilestone8.style.borderColor = (Data.Rest.gte(21)) ? "lightgreen" : "blue"

    RestMilestone9.style.display = (Data.Rest.gte(21)) ? "block" : "none"
    RestMilestone9.style.borderColor = (Data.Rest.gte(24)) ? "lightgreen" : "blue"

    RestMilestone10.style.display = (Data.Rest.gte(24)) ? "block" : "none"
    RestMilestone10.style.borderColor = (Data.Rest.gte(30)) ? "lightgreen" : "blue"
}

function RestReset(force) {
    if (Data.Dreams.gte(calcRestReq())) {
        if (!force) {
            Data.Rest = Data.Rest.add(calcRestGain())
        }

        resetStats(1, 0)
        resetBuyables(4, 1)

        if (!Data.Unlocks.includes("Rest")) {
            Data.Unlocks.push("Rest")
        }
    }
}

function EnableRestAutomation() {
    if (Data.Rest.gte(8) && !Data.Automation.includes("MemoryUpgs")) {
        Data.Automation.push("MemoryUpgs")
    }

    if (Data.Rest.gte(13) && !Data.Automation.includes("DreamUpgs")) {
        Data.Automation.push("DreamUpgs")
    }
}

// automation functions
function automateMemoryUpgs() {
    if (Data.Automation.includes("MemoryUpgs") && Data.Settings.MemoryUpgsAutobuyer == true) {
        buyMaxUpg(1, 'Memory')
        buyMaxUpg(2, 'Memory')
    }

    if (Data.Automation.includes("DreamUpgs") && Data.Settings.DreamUpgsAutobuyer == true) {
        buyMaxUpg(3, 'Dreams')
        buyMaxUpg(4, 'Dreams')
    }
}

setInterval(() => {
    calcRestGain()
    calcRestReq()
    UpdateRestHtml()
    EnableRestAutomation()
    automateMemoryUpgs()
}, 100)