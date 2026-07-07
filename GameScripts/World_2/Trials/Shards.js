let ShardDisplayTxt = document.getElementById("ShardDisplayTxt");

function calcPercent() {
    let ShardsReq = new OmegaNum('1.79e308');
    let Shards = Data.TrialsData.Shards;

    return Shards.div(ShardsReq).mul(100).toFixed(2);
}

function ShardSynergyBoostCalc() {
    let exp = new OmegaNum(0.1);
    
    return OmegaNum.add(1, Data.TrialsData.Shards.pow(exp));
}

function calcShardMult() {
    let mult = new OmegaNum(1);
    if (Data.Upgrades.includes('#1')) mult = mult.mul(2);
    if (Data.Upgrades.includes('#2')) mult = mult.mul(3);
    if (Data.Upgrades.includes('#3')) mult = mult.mul(ShardSynergyBoostCalc());
    
    return mult;
}

function updateTreeUpgsHtml() {
    updateUpgTreeBuyables("#1", "#1CostTxt", ["TrialUpgrade#2", "TrialUpgrade#3"], "10 Shards");
    updateUpgTreeBuyables("#2", "#2CostTxt", undefined, "50 Shards");
    updateUpgTreeBuyables("#3", "#3CostTxt", undefined, "200 Shards");
}

function updateShardHtml() {
    ShardDisplayTxt.textContent = `Shards: ${format(Data.TrialsData.Shards)} [+${format(calcShardMult())}/s] [${calcPercent()}%]`;

    // Upgrade Tree
    updateTreeUpgsHtml();
}

function genShards() {
    let can = false
    if (Data.isInWorld === 'TrialWorld') can = true;

    if (can) {
        Data.TrialsData.Shards = Data.TrialsData.Shards.add(calcShardMult());
    }
}

setInterval(() => {
    updateShardHtml();
    calcPercent();
    calcShardMult();
}, 100);

setInterval(() => {
    genShards();
}, 1000);