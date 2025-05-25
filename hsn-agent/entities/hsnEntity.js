// const path = require('path');
// const fs = require('fs');

// let cachedData = null;

// function loadHSNMasterData() {
//   if (cachedData) return cachedData;

//   try {
//     const jsonPath = path.join(__dirname, "../data/HSN_Master_Data.json");
//     console.log("Loading HSN data from JSON file...");
    
//     const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
//     cachedData = rawData.map(item => ({
//       HSNCode: String(item.HSNCode).padStart(8, '0'),
//       Description: item.Description || "No description"
//     }));
    
//     console.log(`Loaded ${cachedData.length} HSN codes`);
//     return cachedData;
//   } catch (error) {
//     console.error("Error loading JSON data:", error);
//     throw new Error("Failed to load HSN data: " + error.message);
//   }
// }

// function getHSNDescription(code) {
//   const data = loadHSNMasterData();
//   const normalizedCode = String(code).padStart(8, '0');
//   const entry = data.find(row => row.HSNCode === normalizedCode);
//   return entry ? entry.Description : null;
// }

// module.exports = {
//   loadHSNMasterData,
//   getHSNDescription
// };

// entities/hsnEntity.js
const hsnData = [
  { HSNCode: "01", Description: "LIVE ANIMALS" },
  { HSNCode: "01000000", Description: "Parent level 2 for 01" },
  { HSNCode: "0101", Description: "LIVE HORSES, ASSES, MULES AND HINNIES." },
  { HSNCode: "01010000", Description: "Parent level 4 for 0101" },
  { HSNCode: "010110", Description: "Parent level 6 for 010110" },
  { HSNCode: "01011000", Description: "Parent level 6 padded for 010110" },
  { HSNCode: "01011010", Description: "LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES" },
  { HSNCode: "01011020", Description: "LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS ASSES" },
  { HSNCode: "01012100", Description: "PURE-BRED BREEDING ANIMALS" }
];

function loadHSNMasterData() {
  // Load data from memory (could be replaced with DB or file read)
  return hsnData;
}

function getHSNDescription(hsn) {
  const entry = hsnData.find(item => item.HSNCode === hsn);
  return entry ? entry.Description : null;
}

module.exports = { loadHSNMasterData, getHSNDescription };
