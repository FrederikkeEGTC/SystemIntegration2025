// import fs from 'fs';
// import yaml from 'js-yaml';

// function parseYamlToJson(filePath) {
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//     const data = yaml.load(fileContent);

//     const objects = Object.entries(data).map(([objectName, attributes]) => {
//         return { name: objectName, ...attributes };
//     });

//     return objects;
// }

// export default parseYamlToJson;
import yaml from 'js-yaml';
import fs from 'fs';

function parseYamlToJson(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsedData = yaml.load(fileContent);
        
        return parsedData;
    } catch (error) {
        throw new Error('Failed to parse YAML: ' + error.message);
    }
}

export default parseYamlToJson;