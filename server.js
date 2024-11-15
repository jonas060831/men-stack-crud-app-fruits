const express = require("express")
const app = express()
const PORT = 3000

app.get("/", async(req, res) => {
    res.render("index.ejs")
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})