let preventSave = false

var Data = {
    
    Memory: new OmegaNum(0),
    Dreams: new OmegaNum(0),
    Rest: new OmegaNum(0),
    LucidDreams: new OmegaNum(0), LucidEnergy: new OmegaNum(0),
    InfinityDreams: new OmegaNum(0), Infinities: new OmegaNum(0),

    // World 2 Currency
    Void: new OmegaNum(0),
    Thoughts: new OmegaNum(0), ThinkingEnergy: new OmegaNum(0),
    Nightmares: new OmegaNum(0),

    Buyables: {
        1: {
            // Memory Buyable 1
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(10),
            scale: new OmegaNum(2),
        },

        2: {
            // Memory Buyable 2
            amount: new OmegaNum(0),
            max: new OmegaNum(50),
            price: new OmegaNum(50),
            scale: new OmegaNum(2.5),
        },

        3: {
            // Dream Buyable 1
            amount: new OmegaNum(0),
            max: new OmegaNum(1000),
            price: new OmegaNum(1),
            scale: new OmegaNum(2),
        },

        4: {
            // Dream Buyable 2
            amount: new OmegaNum(0),
            max: new OmegaNum(50),
            price: new OmegaNum(3),
            scale: new OmegaNum(3),
        },

        5: {
            // Lucid Dream Buyable 1
            amount: new OmegaNum(0),
            max: new OmegaNum(200),
            price: new OmegaNum(1),
            scale: new OmegaNum(2),
        },

        6: {
            // Lucid Dream Buyable 2
            amount: new OmegaNum(0),
            max: new OmegaNum(200),
            price: new OmegaNum(1.5),
            scale: new OmegaNum(2.5),
        },

        7: {
            // Lucid Dream Buyable 3
            amount: new OmegaNum(0),
            max: new OmegaNum(5),
            price: new OmegaNum(3),
            scale: new OmegaNum(4),
        },

        8: {
            // Infinity Memory Buyable 1
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(1),
            scale: new OmegaNum(3),
        },

        // World 2 Buyables

        9: {
            // Void Buyable 1
            amount: new OmegaNum(0),
            max: new OmegaNum(100),
            price: new OmegaNum(5),
            scale: new OmegaNum(2.5),
        },

        10: {
            // Void Buyable 2
            amount: new OmegaNum(0),
            max: new OmegaNum(5),
            price: new OmegaNum(30),
            scale: new OmegaNum(4),
        },
    },

    Upgrades: [],
    Unlocks: [],
    Automation: [],
    Settings: {
        MemoryUpgsAutobuyer: true,
        DreamUpgsAutobuyer: true,
        AutoRest: true,

        // World 2
        VoidUpgsAutobuyer: true,
    },

    Caps: {
        Memory: {
            cap: new OmegaNum(1.79e308),
            broken: false,
        },
    },

    Challenges: {
        inChallenge: "",
        completedChallenges: [],
    },

    isInWorld: 'world1',

    Milestones: {
        World2: [],
    },
}

function deepCopy(obj) {
    if (obj instanceof OmegaNum) return new OmegaNum(obj);
    if (Array.isArray(obj)) return obj.map(item => deepCopy(item));
    if (typeof obj === 'object' && obj !== null) {
        let result = {};
        for (let key in obj) {
            result[key] = deepCopy(obj[key]);
        }
        return result;
    }
    return obj;
}

const Template = deepCopy(Data);

function saveData() {
    if (!preventSave) {
        try {
            localStorage.setItem("DreamIncremental", btoa(unescape(encodeURIComponent(JSON.stringify(Data)))))
        } catch (e) {
            console.error("Failed to save data:", e);
        }
    }
}

function fixSave(data, template) {
    if (data === undefined || data === null) return deepCopy(template);

    for (let key in template) {
        if (template[key] instanceof OmegaNum && data[key] === undefined) {
            data[key] = new OmegaNum(template[key])
        }

        else if (typeof template[key] === 'object' && template[key] !== null) {
            let isArr = Array.isArray(template[key])
            if (typeof data[key] !== 'object' || data[key] === null) {
                data[key] = isArr ? [] : {}
            }
            data[key] = fixSave(data[key], template[key])
        }

        else if (data[key] === undefined || data[key] === null) {
            data[key] = template[key]
        }
    }
    return data;
}

function loadData() {
    let save = localStorage.getItem("DreamIncremental")

    if (save) {
        try {
            let d = JSON.parse(decodeURIComponent(escape(atob(save))))
            Data = fixSave(d, Template)
            displayWorlds(Data.isInWorld)
        } catch (e) {
            alert("An error ocurred while loading data:\n" + e)
        }
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

setInterval(saveData, 1000)

window.addEventListener('load', loadData)