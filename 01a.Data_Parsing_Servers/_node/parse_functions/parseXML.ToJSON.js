import fs from 'fs';
import xml2js from 'xml2js';

function parseXmlToJson(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve, reject) => {
        xml2js.parseString(fileContent, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

export default parseXmlToJson;