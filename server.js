const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
//PORT
const PORT = 3000
//model
const Fruit = require('./models/fruits.js')


const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))




mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})


app.get("/", async(req, res) => {
    res.render("index.ejs")
})


app.get("/fruits/new", (req, res) => {

    res.render("fruits/new.ejs")
})

app.get("/fruits/:fruitId", async(req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render("fruits/show.ejs", { fruit: foundFruit })
})

app.post("/fruits", async (req, res) => {
    console.log(req.body)

    if(req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body)
    res.redirect("/fruits")
})

app.get("/fruits", async(req, res) => {
    const allFruits = await Fruit.find()
    //console.log(allFruits)
    res.render("fruits/index.ejs", { fruits: allFruits })
})

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit)
    res.render("fruits/edit.ejs", { fruit: foundFruit })
})

app.delete("/fruits/:fruitId", async(req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId)

    res.redirect("/fruits")
})



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})