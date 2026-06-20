let NightmareReqTxt = document.getElementById("NightmareReqTxt");
let NightmareResetBtn = document.getElementById("NightmaresResetBtn");

function calcNightmareReq() {
    let req = new OmegaNum(1e56);

    return req;
}

function updateNightmareHtml() {
    NightmareReqTxt.innerHTML = `You need ${format(calcNightmareReq())} Void`;
    NightmareResetBtn.innerHTML = (Data.Void.gte(1e56)) ? "Nightmare" : "Not enough Void";
}

setInterval(() => {
    calcNightmareReq();
    updateNightmareHtml();
}, 100)