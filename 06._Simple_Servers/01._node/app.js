import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send({ data: "Root route" });
});

app.get("/greetings", (req, res) => {
    res.send({ data: "Konichiwa!" })
})

const PORT = 8080
app.listen(PORT, () => console.log('Server running on port: ', PORT));