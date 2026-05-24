let RestsDisplayTxt = document.getElementById("RestsDisplayTxt")
let RestReqTxt = document.getElementById("RestReqTxt")
let RestResetBtn = document.getElementById("RestResetBtn")

// Rest milestones
let RestMilestone1 = document.getElementById("RestMilestone1")
let RestMilestone2 = document.getElementById("RestMilestone2")
let RestMilestone3 = document.getElementById("RestMilestone3")
let RestMilestone4 = document.getElementById("RestMilestone4")

function calcRestReq() {
    let Breq = new OmegaNum(100)
    let req = Breq.times(OmegaNum.pow(2.5, Data.Rest))

    return req
}

function calcRestGain() {
    let bulk = new OmegaNum(1)

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

setInterval(() => {
    calcRestGain()
    calcRestReq()
    UpdateRestHtml()
}, 100)