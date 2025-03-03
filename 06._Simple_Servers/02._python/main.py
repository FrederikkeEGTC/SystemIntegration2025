from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return { "data": "Hello world" }

#task create a /greetings route that returns a greeting

@app.get("/greetings")
def greet():
    return{ "data": "Konichiwa!" }