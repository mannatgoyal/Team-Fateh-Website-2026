const fs = require('fs');
const archivePath = './src/data/team_archive.json';

let arch = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
const yearsTargeted = ["2022", "2023", "2024", "2025"];

yearsTargeted.forEach(year => {
    let yearData = arch[year];
    if (!yearData) return;

    let saliObj = null;

    // Remove from Chief Design Engineer if it exists
    if (yearData["Chief Design Engineer"]) {
        const index = yearData["Chief Design Engineer"].findIndex(m => m.name === "Saliq Shah");
        if (index !== -1) {
            saliObj = yearData["Chief Design Engineer"][index];
            yearData["Chief Design Engineer"].splice(index, 1);
        }
        if (yearData["Chief Design Engineer"].length === 0) {
            delete yearData["Chief Design Engineer"];
        }
    }

    if (!saliObj) {
        // Find him elsewhere just in case
        for (const dept in yearData) {
            const arr = yearData[dept];
            if (Array.isArray(arr)) {
                const idx = arr.findIndex(m => m.name === "Saliq Shah");
                if (idx !== -1) {
                    saliObj = arr[idx];
                    arr.splice(idx, 1);
                }
            }
        }
    }

    // Default object if not found
    if (!saliObj) {
        saliObj = {
            "name": "Saliq Shah",
            "role": "Chief Engineer",
            "image": "/images/Team/special_mention/saliq_shah.png"
        };
    } else {
        saliObj.role = "Chief Engineer";
    }

    // Insert to Team Leaders
    if (!yearData["Team Leaders"]) {
        yearData["Team Leaders"] = [];
    }

    // Add Saliq Shah to Team Leaders if not already there
    if (!yearData["Team Leaders"].some(m => m.name === "Saliq Shah")) {
        yearData["Team Leaders"].push(saliObj);
    }
});

fs.writeFileSync(archivePath, JSON.stringify(arch, null, 2));
console.log("Moved Saliq Shah.");
