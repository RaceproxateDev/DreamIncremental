function displayWorlds(worldId) {
    let w = document.getElementsByClassName("world")

    for (let i = 0; i < w.length; i++) {
        w[i].style.display = (w[i].id === worldId) ? "inline-bloci" : "none"
    }
}

function displayContent(contentId) {
    let c = document.getElementsByClassName("content")

    for (let i = 0; i < c.length; i++) {
        c[i].style.display = (c[i].id === contentId) ? "inline-bloci" : "none"
    }
}

function BuyUpg(id, curr) {
    if (Data[curr].gte(Data.Buyables.price) && !Data.Buyables.amount.gt(Data.Buyables.max)) {
        Data[curr] = Data[curr].sub(Data.Buyables.price)
        Data.Buyables.amount = Data.Buyables.amount.add(1)
        Data.Buyables.price = Data.Buyables.price.times(Data.Buyables.scale)
    }
}

function buyOneTimeUpg(tier, id, curr, cost) {
    if (Data[curr].gte(cost) && !Data.Upgrades.includes(id)) {
        Data[curr].sub(cost)
        Data.Upgrades.push(id)
    }
}

function reset(max, min) {
    for (let i = min; i <= max; i++) {

        if (Template[i]) {
            Data[i] = Template[i];
        }
    }
}