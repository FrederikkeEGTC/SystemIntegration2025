import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send({ data: "Second express server" })
})

const PORT= 8080
app.listen(PORT, () => console.log("Serder running on port:", PORT));