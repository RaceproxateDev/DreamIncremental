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

function BuyUpg(tier, id, curr) {
    if (Data[curr].gte(Data['tier' + tier].Buyables.price) && !Data['tier' + tier].Buyables.amount.gt(Data['tier' + tier].Buyables.max)) {
        Data[curr] = Data[curr].sub(Data['tier' + tier].Buyables.price)
        Data['tier' + tier].Buyables.amount = Data['tier' + tier].Buyables.amount.add(1)
        Data['tier' + tier].Buyables.price = Data['tier' + tier].Buyables.price.times(Data['tier' + tier].Buyables.scale)
    }
}

function buyOneTimeUpg(tier, id, curr, cost) {
    if (Data['tier' + tier][curr].gte(cost) && !Data['tier' + tier].Upgrades.includes(id)) {
        Data['tier' + tier][curr].sub(cost)
        Data['tier' + tier].Upgrades.push(id)
    }
}

function reset(maxTier, minTier) {
    for (let i = minTier; i <= maxTier; i++) {
        const k = 'tier' + i;

        if (Template[k]) {
            Data[k] = Template[k];
        }
    }
}