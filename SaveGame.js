let preventSave = false

var Data = {
    ["tier0"]: {
        Memory: new OmegaNum(0),

        Buyables: {
            1: {
                amount: new OmegaNum(0),
                max: new OmegaNum(100),
                price: new OmegaNum(10),
                scale: new OmegaNum(2.5),
            },
        },

        Upgrades: [],
    }
}

var Template = {
    ["tier0"]: {
        Memory: new OmegaNum(0),

        Buyables: {
            1: {
                amount: new OmegaNum(0),
                max: new OmegaNum(100),
                price: new OmegaNum(10),
                scale: new OmegaNum(2.5),
            },
        },

        Upgrades: [],
    }
}

function saveData() {
    if (!preventSave) {
        localStorage.setItem("DreamIncremental", btoa(unescape(encodeURIComponent(JSON.stringify(Data)))))
    }
}

function fixSave(data, template) {
    if (data === null || data === undefined) return JSON.parse(JSON.stringify(template));

    for (let key in template) {
        if (data[key] === undefined) {
            data[key] = template[key]
        }

        else if (template[key] instanceof OmegaNum) {
            data[key] = new OmegaNum(data[key] ?? template[key])
        }

        else if (typeof template[key] === 'object' && template[key] !== null) {
            if (typeof data[key] !== 'object' || data[key] === null) {
                data[key] = JSON.parse(JSON.stringify(template[key]));
            } else {
                fixSave(data[key], template[key]);
            }
        }
    }

    return data;
}

function loadData() {
    let save = localStorage.getItem("DreamIncremental")

    if (save) {
        let d = JSON.parse(decodeURIComponent(escape(atob(save))))

        fixSave(d, Template)
        Data = d
    }
}

function resetData() {
    if (confirm("Are you sure you want to reset your Data?")) {
        localStorage.removeItem("DreamIncremental")
        preventSave = true
        location.reload()
    }
}

function ExportData() {
    try {
        const d = localStorage.getItem("DreamIncremental")

        if (!d) {
            alert("No save data have been found!")
            return;
        }

        navigator.clipboard.writeText(d).then(() => {
            alert("Exported to clipboard!")
        })

    } catch (e) {
        alert("Invalid Export.")
    }
}

function ImportData() {
    let inp = prompt("Paste your save data here:")
    if (!inp) return;

    try {
        let d = JSON.parse(decodeURIComponent(escape(atob(inp))))

        fixSave(d, Template)

        Data = d
        saveData();

        location.reload()

    } catch (err) {
        alert("Invalid save data.")
        console.error(err)
    }
}

setInterval(saveData, 100)

window.addEventListener('load', loadData)