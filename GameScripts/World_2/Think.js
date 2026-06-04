let ThinkReqTxt = document.getElementById('ThinkReqTxt')
let ThinkResetBtn = document.getElementById('ThinkResetBtn')

function calcThoughtsReq() {
    let scale = new OmegaNum(2.5)
    let base = new OmegaNum(300)

    let req = base.times(OmegaNum.pow(scale, Data.Thoughts))

    return req
}

function calcThoughtsBulk() {
    let bulk = new OmegaNum(1)

    return bulk
}

function ThinkReset(force) {
    if (Data.Void.gte(calcThoughtsReq())) {
        if (!force) {
            Data.Thoughts = Data.Thoughts.add(calcThoughtsBulk())
        }

        resetStats(7,7)
        resetBuyables(10, 9)

        if (!Data.Unlocks.includes("Thoughts")) {
            Data.Unlocks.push('Thoughts')
        }
    }
}

function updateThinkHTML() {
    ThinkReqTxt.innerHTML = `You need ${calcThoughtsReq()} Void`
    ThinkResetBtn.innerHTML = (Data.Void.gte(calcThoughtsReq())) ? 'Think' : 'Meet the requirements'
}

setInterval(() => {
    calcThoughtsReq()
    calcThoughtsBulk()
    updateThinkHTML()
}, 100)