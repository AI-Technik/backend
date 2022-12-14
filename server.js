if (process.env.NODE_ENV !== "production"){
  require("dotenv").config({path: "./.env"})
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose"
)
const indexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views/layouts")
app.set("layout", "layouts")
app.use(expressLayouts)
app.use(express.static("public"))

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to mongoose"))

app.use("/", indexRouter)

app.listen(process.env.PORT || 3000)