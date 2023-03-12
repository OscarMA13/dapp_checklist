const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Define an API endpoint to get the contract address
app.get("/api/contract-address", (req, res) => {
  const pathToAddress = path.join(__dirname, "contract-address.json");
  const contractAddress = JSON.parse(fs.readFileSync(pathToAddress).toString());
  res.send(contractAddress);
});

// Catch-all endpoint to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
