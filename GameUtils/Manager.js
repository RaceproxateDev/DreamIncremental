function displayWorlds(worldId) {
    let w = document.getElementsByClassName("world")

    for (let i = 0; i < w.length; i++) {
        w[i].style.display = (w[i].id === worldId) ? "inline-block" : "none"
    }
}

function displayContent(contentId) {
    let c = document.getElementsByClassName("content")

    for (let i = 0; i < c.length; i++) {
        c[i].style.display = (c[i].id === contentId) ? "inline-block" : "none"
    }
}

function BuyUpg(id, curr) {
    if (Data[curr].gte(Data.Buyables[id].price) && !Data.Buyables[id].amount.gt(Data.Buyables[id].max)) {
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
            scale: new OmegaNum(Template.Buyables[i].scale)
        };
    }
}