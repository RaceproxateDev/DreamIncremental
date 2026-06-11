let ThinkReqTxt = document.getElementById('ThinkReqTxt')
let ThinkResetBtn = document.getElementById('ThinkResetBtn')
let ThoughtsDisplayTxt = document.getElementById('ThoughtsDisplayTxt')

// style
let MilestonesStyle = {
    borderColor: 'rgb(0, 255, 183)'
}

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
  ThinkReqTxt.innerHTML = `You need ${format(calcThoughtsReq())} Void`
  ThinkResetBtn.innerHTML = (Data.Void.gte(calcThoughtsReq())) ? 'Think' : 'Meet the requirements'
  ThoughtsDisplayTxt.innerHTML = `Thinking Milestones [${format(Data.Thoughts)} Thoughts]`

  // Thinking Milestones
  achieveMilestone('ThinkMilestone1', 'Thoughts', new OmegaNum(1), undefined, 'World2', ThinkMilestone1, MilestonesStyle)

  unlockNextMilestone('ThinkMilestone1', ThinkMilestone2, 'World2')
  achieveMilestone('ThinkMilestone2', 'Thoughts', new OmegaNum(2), undefined, 'World2', ThinkMilestone2, MilestonesStyle)

  unlockNextMilestone('ThinkMilestone2', ThinkMilestone3, 'World2')
  achieveMilestone('ThinkMilestone3', 'Thoughts', new OmegaNum(3), undefined, 'World2', ThinkMilestone3, MilestonesStyle)
}

setInterval(() => {
    calcThoughtsReq()
    calcThoughtsBulk()
    updateThinkHTML()
}, 100)