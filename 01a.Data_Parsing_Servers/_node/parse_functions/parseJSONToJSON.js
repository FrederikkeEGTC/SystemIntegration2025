import fs from 'fs';

function parseJsonToJson(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export default parseJsonToJson;