const fs = require('fs');

const currentPath = './src/data/team_current.json';
const archivePath = './src/data/team_archive.json';

function removeMembers(obj, namesToRemove) {
    if (Array.isArray(obj)) {
        return obj.filter(member => !namesToRemove.some(name => member.name.includes(name)));
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            obj[key] = removeMembers(obj[key], namesToRemove);
        }
    }
    return obj;
}

const names = ["Achyut", "Sarthak"];

let curr = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
curr = removeMembers(curr, names);
fs.writeFileSync(currentPath, JSON.stringify(curr, null, 2));

let arch = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
arch = removeMembers(arch, names);
fs.writeFileSync(archivePath, JSON.stringify(arch, null, 2));

console.log("Removed members.");
