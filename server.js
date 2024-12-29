const express = require("express");
require("dotenv").config();


// Module Import

// Import for Users
const userRouter =  require ('./src/v1.0/users/routers/users_Router')

// Import for Modules
const modulesRouter =  require ('./src/v1.0/modules/routers/module_Router')

// Import for Transaction
const transactionRouter =  require ('./src/v1.0/transactions/routers/transaction_Routers')


const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1.0", userRouter)
app.use("/api/v1.0", modulesRouter)
app.use("/api/v1.0", transactionRouter)

// Init
app.listen(process.env.APPSPORT, () => {
  // console.log(`http://127.0.0.1:${process.env.APPSPORT}`); // TODO Remark this if Deploy to server
  console.log(`http://0.0.0.0:${process.env.APPSPORT}`); // TODO unremark this if deploy to server
});
