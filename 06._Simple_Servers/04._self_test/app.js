import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send({ data: "Self test" })
})

const PORT = 8080;
app.listen(PORT, () => console.log("Server listening on port: ", PORT))