require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./db/db");
connectDB();
const userRoute = require("./routes/userRoute");
const familyRoute = require("./routes/familyRoute");
const errorHandler = require("./middleware/error");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/family", familyRoute);
app.use(errorHandler);

app.listen(5000, () => console.log(`Server is running on 5000`));
