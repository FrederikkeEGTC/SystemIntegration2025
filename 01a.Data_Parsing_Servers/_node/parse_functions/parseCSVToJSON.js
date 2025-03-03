import fs from 'fs';
import Papa from 'papaparse';


function parseCsvToJson(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            complete: function(results) {
                resolve(results.data);
                
            },
            error: function(err) {
                reject(err);
            }
        });
        
    });
}

export default parseCsvToJson;
//parseCsvToJson('../Data/Set1/Dog.csv')