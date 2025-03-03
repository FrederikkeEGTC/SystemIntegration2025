import json
import yaml #py -m pip install pyyaml
import csv
import xml.etree.ElementTree as ET
import os

def parse_file(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    try: 
        with open(file_path, 'r', encoding='utf-8') as file:
            
            if extension == '.txt':
                data = []
                for line in file:
                    if '=' in line:
                        key, value = line.strip().split('=', 1)
                        data.append({key: value})
                return data
            
            elif extension == '.json':
                parsed_json = json.load(file)
                if isinstance(parsed_json, list):
                    return parsed_json
                return [parsed_json]
            
            elif extension == '.csv':
                reader = csv.DictReader(file)
                return [row for row in reader]
            
            elif extension in ['.yaml', '.yml']:
                parsed_yaml = yaml.safe_load(file)
                if isinstance(parsed_yaml, list):
                    return parsed_yaml
                return [parsed_yaml]
            
            elif extension =='.xml':
                tree = ET.parse(file_path)
                root = tree.getroot()
                if root.tag == 'dog':
                    dog_data = {child.tag: child.text for child in root}
                    return [dog_data]
                elif root.tag == 'lotr':
                    characters = []
                    for character in root.findall('character'): 
                        character_data = {
                            'name': character.get('name'),
                            'age': character.find('age').text,
                            'race': character.find('race').text,
                            'weapons': [weapon.text for weapon in character.findall('weapons/weapon')],
                            'titles': [title.text for title in character.findall('titles/title')]
                        }
                        characters.append(character_data)
                    return characters
                else:
                    print("Unexpected root element.")
                    return {}
            
            else:
                return f'Unsupported file type: {extension}'
    except Exception as e:
        return f'Error reading {file_path}: {e}'

def print_data():
    prefix1 = 'Data/Set1/dog'
    prefix2 = 'Data/Set2/lotr'
    files = [f'{prefix1}.txt', f'{prefix1}.json', f'{prefix1}.csv', f'{prefix1}.xml', f'{prefix1}.yaml',
            f'{prefix2}.txt', f'{prefix2}.json', f'{prefix2}.csv', f'{prefix2}.xml', f'{prefix2}.yaml']

    for file in files:
        print(f'\n--- {file} ---')
        parsed_data = parse_file(file)
        data_structure = type(parsed_data).__name__

        print(f'\nParsed data: {parsed_data}')
        print(f'\nData stucture: {data_structure}\n')

if __name__ == '__main__':
    print_data()