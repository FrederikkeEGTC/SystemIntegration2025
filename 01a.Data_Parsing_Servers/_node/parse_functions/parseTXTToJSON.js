import fs from 'fs';

function parseTxtToJson(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const objectBlocks = fileContent.split('\n\n');
    
    const data = [];
    let currentObject = {};

    // Iterate over each character block
    objectBlocks.forEach(block => {
        const lines = block.split('\n');
        lines.forEach(line => {
            if (line.trim() === '') return;  // Skip empty lines

            const [key, value] = line.split('=').map(item => item.trim());

            if (key === 'name' && currentObject.name) {
                // If a new 'name' is found and there's already an existing object,
                // push the current character to the data array and reset
                data.push(currentObject);
                currentObject = {};  // Start a new character object
            }

            // Add the key-value pair to the current character object
            currentObject[key] = value;
        });
    });

    // Don't forget to push the last character to the data array
    if (currentObject.name) {
        data.push(currentObject);
    }

    return data;
}

export default parseTxtToJson;
