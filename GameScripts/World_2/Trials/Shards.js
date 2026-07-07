let ShardDisplayTxt = document.getElementById("ShardDisplayTxt");

function calcPercent() {
    let ShardsReq = new OmegaNum('1.79e308');
    let Shards = Data.TrialsData.Shards;

    return Shards.div(ShardsReq).mul(100).toFixed(2);
}

function calcShardMult() {
    let mult = new OmegaNum(1);
    return mult;
}

function updateShardHtml() {
    ShardDisplayTxt.textContent = `Shards: ${format(Data.TrialsData.Shards)} [+${format(calcShardMult())}/s] [${calcPercent()}%]`;
}

function genShards() {
    let can = true

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