from fastapi import FastAPI
#import parse_files

#Run: uvicorn main:app --reload

app = FastAPI()

@app.get('/')
def root():
    return ({ "data": "Hello" })

app.get('/data')
def data():
    return ({ 'data: 161616'})