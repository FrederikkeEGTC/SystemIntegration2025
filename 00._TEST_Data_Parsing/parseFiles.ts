import fs from 'fs';
import path from 'path';
import json5 from 'json5';
import yaml from 'js-yaml';
import csv from 'csv-parser';
import { parseStringPromise } from 'xml2js';

type Data = Array<{ [key: string]: string}>;

async function parseFiles(filePath: string): Promise<Data |any> {
    const extention = path.extname(filePath).toLocaleLowerCase();

    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');

        if (extention === '.txt') {
            const txtData: Data = [];
            const lines = fileData.split('\n');
            for (const line of lines) {
                const [key, value] = line.split('=').map((item) => item.trim());
                if (key && value) {
                    txtData.push({ [key]: value});
                }
            }
            return txtData;
        } else if (extention === '.json') {
            const parsedJson = json5.parse(fileData);
            return Array.isArray(parsedJson) ? parsedJson : [parsedJson];
        } else if (extention === '.csv') {
            const csvData: Data = [];
            await new Promise<void>((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => csvData.push(row))
                    .on('end', () => resolve())
                    .on('error', (err) => reject(err));
            });
            return csvData;

        } else if (extention === '.yaml' || extention === '.yml') {
            const parsedYaml = yaml.load(fileData);
            return Array.isArray(parsedYaml) ? parsedYaml : [parsedYaml];
        } else if (extention === '.xml') {
            const parsedXml = await parseStringPromise(fileData);
            if (parsedXml.lotr) {
                const characters = parsedXml.lotr.character.map((character: any) => ({
                    name: character.name,
                    age: character.age[0],
                    race: character.race[0],
                    weapons: character.weapons[0].weapon,
                    titles: character.titles[0].title,
                }));
                return characters;
        } else if (parsedXml.dog) {
            const dogData = Object.fromEntries( 
                Object.entries(parsedXml.dog).map(([key, value]) => [key, value[0]])
            );
            return [dogData];
        }
        return {};
    } else {
        return `Unsupported file type: ${extention}`;
    }

    } catch (error) {
        return `Error reading ${filePath}: ${error}`
    }
    
}