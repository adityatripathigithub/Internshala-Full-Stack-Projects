require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
// const cookieParser = require('cookie-parser');

const cors = require("cors");



// db connection
require("./models/database").connectDatabase();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// logger
const logger = require('morgan');
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*60*10},
  secret:process.env.EXPRESS_SESSION_SECRET,
})) 
app.use(cookieparser())

// file upload
const fileupload = require("express-fileupload");
app.use(fileupload());

// routes
app.use("/",require("./routes/indexRoutes"));
app.use("/resume",require("./routes/resumeRoutes"));
app.use("/employe",require("./routes/employeRoutes"));

//error handling 
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } =require('./middlewares/errors');

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`),404);
});
app.use(generatedErrors);



app.listen(
  3000,
  console.log(`server running on port `)
);
