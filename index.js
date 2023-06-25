const express = require('express');
const app = express();

// CONNECT DB
const ConnectMongo = require("./db/db");
ConnectMongo().catch(err => console.log(err));

const productsRouter = require("./routes/productsRoute")

const UserModel = require("./models/userModel")

require("dotenv").config();

const jwt = require("jsonwebtoken")

// Use Cors for Cross origin, mean, frontend and backend on different servers, so to Bypass CORS blocking, use it
const cors = require("cors")
app.use(cors())


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/register", async (req, res) => {
  try {
    const userData = await UserModel.create({ name: req.body.name, email: req.body.email, password: req.body.password });
    res.send({ status: "ok", msg: "User created successfully" });
  } catch (error) {
    res.json({ msg: "something went wrong", error })
  }
})

app.post("/login", async (req, res) => {
  // console.log(req.body)
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (user) {

    let token = jwt.sign({
      email: req.body.email,
      password: req.body.password,
    }, 'hollow')

    res.send({ status: 'ok', authToken: token })
  }
  else {
    res.send({ status: 'Sorry, use right credentials', authToken: false })
  }
})

app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})