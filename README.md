# hsn-validator
A Node.js-based webhook agent for validating HSN (Harmonized System of Nomenclature) codes with format and hierarchy checks.

HSN Validator
Overview:
This project implements an HSN (Harmonized System of Nomenclature) code validation agent built with Node.js and Express. It validates HSN codes based on predefined data and checks hierarchical correctness.

Features:
-Validates HSN codes for correct format and existence.
-Checks hierarchical integrity of HSN codes.
-Provides descriptive feedback for valid and invalid codes.

Simple webhook API for integration.

How to Run
Clone the repository:
git clone https://github.com/Rasmiya22/hsn-validator.git
cd hsn-validator
Install dependencies:
npm install
Start the server:
node app.js
Test webhook with curl or Postman by sending a POST request to http://localhost:3000/webhook.

API Usage
Endpoint: POST /webhook

Body example:


{
  "intent": "ValidateHSNIntent",
  "queryResult": {
    "parameters": {
      "hsn": "01011010"
    }
  },
  "query": "01011010"
}
Sample Response

{
  "fulfillmentText": "✅ Valid HSN: 01011010\nLIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES",
  "code": "01011010",
  "valid": true,
  "description": "LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES",
  "reason": "Exact match with valid hierarchy",
  "matchedLevel": 8,
  "hierarchyValid": true,
  "status": 200
}
Project Structure
app.js - Main Express server and webhook handler

fulfillment/validateHSN.js - Core HSN validation logic

entities/hsnEntity.js - HSN data and helper functions

data/hsn.json - HSN master data file

Author
Rasmiya


