require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./db/db");
connectDB();
const companyRoute = require("./routes/companyRoute");
const staffRoute = require("./routes/staffRoute");

app.use(morgan("tiny")); 
app.use(express.json());

app.use("/api/company", companyRoute);
app.use("/api/staff", staffRoute);

app.listen(5000, () => console.log(`Server is running on 5000`));
