const express = require("express");
const cors = require("cors");
const db = require('./config/dbConfig')
const authRoutes = require("./routes/auth.routes")
const operatorRoutes = require("./routes/operator.routes")
const adminRoutes = require("./routes/admin.routes")
const productRoutes = require("./routes/product.routes")
const fieldOfficerRoutes = require("./routes/fieldOfficer.routes")
// const taskRoutes = require("./app/routes/task.routes")
// const tagRoutes = require("./app/routes/tag.routes")
// const todoTagRoutes = require("./app/routes/todoTag.routes")

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

db.sequelize.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch (err => {
        console.log(err);
    })

db.sequelize.sync({force: false})
    .then(() => {
        console.log("Yes Resyncing to the database has been done");
    }).catch (err => {
        console.log(err);
    })

app.use(express.json())
app.use(cors(corsOptions));

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo application." });
});
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/operator", operatorRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/field-officer", fieldOfficerRoutes)
// app.use("/api/v1", tagRoutes)
// app.use("/api/v1", todoTagRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong with the Server"
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});