// Establishing port/routes, and access to packages
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const noteRoutes = require("./routes/noteRoutes");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", noteRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}!`);
});
