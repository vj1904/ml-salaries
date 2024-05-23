// proxy-server/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 5000;
const csv = require('csvtojson');

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Proxy server is running");
});
const CSV_FILE_PATH = path.join(__dirname, "salaries.csv");

// Define the output directory (ensure this directory exists or create it)
const OUTPUT_DIR = path.join(__dirname, "output");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
}

// Function to convert CSV to JSON
const convertCsvToJson = async (csvFilePath) => {
  try {
    // Convert CSV to JSON array
    const jsonArray = await csv().fromFile(csvFilePath);

    // Log the jsonArray to see the output

    // Define the path for the output JSON file
    const JSON_FILE_PATH = path.join(OUTPUT_DIR, "kaggle-data.json");

    // Write the JSON array to a file
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(jsonArray, null, 2), 'utf-8');
    return jsonArray
    console.log('CSV rows have been converted to JSON and saved in the output directory as kaggle-data.json');
    
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
  }
};

// Call the function with the path to the CSV file


app.get("/api/kaggle-data", async (req, res) => {
  try {
    
    // console.log(convertCsvToJson(CSV_FILE_PATH));
    const data =await convertCsvToJson(CSV_FILE_PATH)
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
