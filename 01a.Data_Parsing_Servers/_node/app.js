import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import parseCsvToJson from './parse_functions/parseCSVToJSON.js';
import parseTxtToJson from './parse_functions/parseTXTToJSON.js';
import parseYamlToJson from './parse_functions/parseYAMLToJSON.js';
import parseJsonToJson from './parse_functions/parseJSONToJSON.js';
import parseXmlToJson from './parse_functions/parseXML.ToJSON.js';

//npm init -y
//npm install express
//nodemon <filename>

const app = express()

const PORT = 8080

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    //console.log('Req: ', req)
    res.send({ data: 'hej' })
})

app.get('/csv', async (req, res) => {
    try {
        const filePaths = [
            path.resolve(__dirname, '../Data/Set1/dog.csv'),
            path.resolve(__dirname, '../Data/Set2/lotr.csv')
        ];

        let results = [];

        for (const filePath of filePaths) {
            const data = await parseCsvToJson(filePath);
            results.push(data);
        }

        res.json(results); // Send all results once after the loop
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse CSV', details: error.message });
    }
});

app.get('/txt', async (req, res) => {
    try {
        
        const filePaths = [
            path.resolve(__dirname, '../Data/Set1/dog.txt'),
            path.resolve(__dirname, '../Data/Set2/lotr.txt')
        ];

        const results = [];

        for (const filePath of filePaths) {
            const data = parseTxtToJson(filePath);  // Synchronously returning the parsed data
            results.push(data);
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse TXT', details: error.message });
    }
});

app.get('/yaml', async (req, res) => {
    try {
        const filePaths = [
            path.resolve(__dirname, '../Data/Set1/dog.yaml'),
            path.resolve(__dirname, '../Data/Set2/lotr.yaml')
        ];
        const results = [];

        for (const filePath of filePaths) {
            const data = await parseYamlToJson(filePath);
            results.push(data);
        }

        res.json(results);  
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse YAML', details: error.message });
    }
});

app.get('/json', async (req, res) => {
    try {
        const filePaths = [
            path.resolve(__dirname, '../Data/Set1/dog.json'),
            path.resolve(__dirname, '../Data/Set2/lotr.json')
        ];
        const results = [];

        for (const filePath of filePaths) {
            const data = await parseJsonToJson(filePath);
            results.push(data);
        }

        res.json(results);  
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse YAML', details: error.message });
    }
});

app.get('/xml', async (req, res) => {
    try {
        const filePaths = [
            path.resolve(__dirname, '../Data/Set1/dog.xml'),
            path.resolve(__dirname, '../Data/Set2/lotr.xml')
        ];
        const results = [];

        for (const filePath of filePaths) {
            const data = await parseXmlToJson(filePath);
            results.push(data);
        }

        res.json(results);  
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse YAML', details: error.message });
    }
});


app.listen(PORT, () => console.log('Server listening on port: ', PORT))