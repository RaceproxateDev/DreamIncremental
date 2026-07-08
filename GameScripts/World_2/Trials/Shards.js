let ShardDisplayTxt = document.getElementById("ShardDisplayTxt");

function calcPercent() {
    let ShardsReq = new OmegaNum('1.79e308');
    let Shards = Data.TrialsData.Shards;

    return Shards.div(ShardsReq).mul(100).toFixed(2);
}

function ShardSynergyBoostCalc() {
    let exp = new OmegaNum(0.1);
    if (Data.Upgrades.includes('#5')) exp = exp.add(0.1);
    if (Data.Upgrades.includes('#9')) exp = exp.add(0.2);
    if (Data.Upgrades.includes('#13')) exp = exp.add(0.05);
    
    return OmegaNum.add(1, Data.TrialsData.Shards.pow(exp));
}

function calcShardMult() {
    let mult = new OmegaNum(1);
    if (Data.Upgrades.includes('#1')) mult = mult.times(2);
    if (Data.Upgrades.includes('#2')) mult = mult.times(3);
    if (Data.Upgrades.includes('#3')) mult = mult.times(ShardSynergyBoostCalc());
    if (Data.Upgrades.includes('#4')) mult = mult.times(10);
    if (Data.Upgrades.includes('#6')) mult = mult.pow(1.01);
    if (Data.Upgrades.includes('#7')) mult = mult.times(4);
    if (Data.Upgrades.includes('#8')) mult = mult.pow(1.1);
    if (Data.Upgrades.includes('#10')) mult = mult.times(25);
    if (Data.Upgrades.includes('#11')) mult = mult.times(2);
    if (Data.Upgrades.includes('#12')) mult = mult.times(3);
    
    return mult;
}

function updateTreeUpgsHtml() {
    updateUpgTreeBuyables("#1", "#1CostTxt", ["TrialUpgrade#2", "TrialUpgrade#3"], "10 Shards");
    updateUpgTreeBuyables("#2", "#2CostTxt", "TrialUpgrade#5", "50 Shards");
    updateUpgTreeBuyables("#3", "#3CostTxt", "TrialUpgrade#4", "200 Shards");
    updateUpgTreeBuyables("#4", "#4CostTxt", undefined, "800 Shards");
    updateUpgTreeBuyables("#5", "#5CostTxt", ["TrialUpgrade#6", "TrialUpgrade#7", "TrialUpgrade#8"], "10,000 Shards")
    updateUpgTreeBuyables("#6", "#6CostTxt", undefined, "15,000 Shards");
    updateUpgTreeBuyables("#7", "#7CostTxt", undefined, "20,000 Shards");
    updateUpgTreeBuyables("#8", "#8CostTxt", ["TrialUpgrade#9", "TrialUpgrade#10"], "80,000 Shards");
    updateUpgTreeBuyables("#9", "#9CostTxt", undefined, "150,000 Shards");
    updateUpgTreeBuyables("#10", "#10CostTxt", undefined, "1,000,000 Shards");
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