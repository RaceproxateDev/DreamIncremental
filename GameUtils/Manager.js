function displayWorlds(worldId) {
    let w = document.getElementsByClassName("world")

    for (let i = 0; i < w.length; i++) {
        w[i].style.display = (w[i].id === worldId) ? "inline-block" : "none"
        Data.isInWorld = worldId
    }
}

function displayContent(contentId) {
    let c = document.getElementsByClassName("content")

    for (let i = 0; i < c.length; i++) {
        c[i].style.display = (c[i].id === contentId) ? "inline-block" : "none"
    }
}

function BuyUpg(id, curr) {
    if (Data[curr].gte(Data.Buyables[id].price) && !Data.Buyables[id].amount.gte(Data.Buyables[id].max)) {
        Data[curr] = Data[curr].sub(Data.Buyables[id].price)
        Data.Buyables[id].amount = Data.Buyables[id].amount.add(1)
        Data.Buyables[id].price = Data.Buyables[id].price.times(Data.Buyables[id].scale)
    }
}

function buyMaxUpg(id, curr) {
    while (Data[curr].gte(Data.Buyables[id].price) && !Data.Buyables[id].amount.gte(Data.Buyables[id].max) && !Data[curr].lt(Data.Buyables[id].price)) {
        Data[curr] = Data[curr].sub(Data.Buyables[id].price)
        Data.Buyables[id].amount = Data.Buyables[id].amount.add(1)
        Data.Buyables[id].price = Data.Buyables[id].price.times(Data.Buyables[id].scale)
    }
}

function buyOneTimeUpg(id, curr, cost) {
    if (Data[curr].gte(cost) && !Data.Upgrades.includes(id)) {
        Data[curr] = Data[curr].sub(cost)
        Data.Upgrades.push(id)
    }
}

function resetStats(max, min) {
    for (let i = min; i <= max; i++) {
        Data[Object.keys(Data)[i]] = Template[Object.keys(Template)[i]]
    }
}

function resetBuyables(limit, start) {
    for (let i = start; i <= limit; i++) {
        Data.Buyables[i] = {
            amount: new OmegaNum(Template.Buyables[i].amount),
            max: new OmegaNum(Template.Buyables[i].max),
            price: new OmegaNum(Template.Buyables[i].price),
            scale: new OmegaNum(Template.Buyables[i].scale),
        };
    }
}

function resetArrays(Array, TargetItem) {
    let a = []

    for (let item of Array) {
        let target = false;

        if (item === TargetItem) {
            target = true;
        }

        if (target) {
            a.push(item)
        }
    }

    return a;
}

function startChallenge(name, ChallengeName) {
    if (name !== null && Data.Challenges.inChallenge === '') {
        Data.Challenges.inChallenge = name
    } else if (Data.Challenges.inChallenge === name) {
        Data.Challenges.inChallenge = ''
    }
}

function isInChallenge(name) {
    return Data.Challenges.inChallenge === name
}

function hasChallenge(name) {
    return Data.Challenges.completedChallenges.includes(name)
}

function canCompleteChallenge(name, req, curr) {
    if (Data[curr].gte(req)) {
        if (isInChallenge(name)) {
            if (!hasChallenge(name)) {
                return true
            }
        }
    }

    return false
}

function completeChallenge(name, req, curr) {
    if (Data[curr].gte(new OmegaNum(req))) {
        if (isInChallenge(name)) {
            if (!hasChallenge(name)) {
                Data.Challenges.completedChallenges.push(name)
            }
        }
    }
}

function updateChallengeHTML(challengeName, htmlTxt, curr, req, htmlBtn=null) {
    let beaten = hasChallenge(challengeName)
    let inChallenge = isInChallenge(challengeName)
    let canComplete = canCompleteChallenge(challengeName, new OmegaNum(req), curr)

    if (beaten && !inChallenge) {
        htmlTxt.textContent = 'Challenge Completed'
        htmlBtn.style.borderColor = 'lightgreen'
    } else if (inChallenge) {
        htmlTxt.textContent = 'Exit Challenge'
        htmlBtn.style.borderColor = 'yellow'
    } else if (canComplete) {
        htmlTxt.textContent = 'Complete Challenge'
        htmlBtn.style.borderColor = 'lightgreen'
    } else {
        htmlTxt.textContent = 'Start Challenge'
        htmlBtn.style.borderColor = 'red'
    }
}

function unlockNewChallenges(htmlChallenge, ReqChallengeName) {
    if (hasChallenge(ReqChallengeName)) {
        htmlChallenge.style.display = 'inline-block'
    } else {
        htmlChallenge.style.display = 'none'
    }
}

function breakCaps(cap) {
    if (Data.Caps[cap].broken === false) {
        Data.Caps[cap].broken = true
    }
}