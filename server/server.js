require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./db/db");
connectDB();
const companyRoute = require("./routes/companyRoute");
const staffRoute = require("./routes/staffRoute");
const protected = require("./routes/protected");
const errorHandler = require("./middleware/error");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/company", companyRoute);
app.use("/api/staff", staffRoute);
app.use("/api/protect", protected);
app.use(errorHandler);

app.listen(5000, () => console.log(`Server is running on 5000`));
