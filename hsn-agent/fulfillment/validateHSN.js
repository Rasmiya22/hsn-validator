// const { getHSNDescription, loadHSNMasterData } = require('../entities/hsnEntity');

// function validateFormat(hsn) {
//   return typeof hsn === 'string' && /^\d{2,8}$/.test(hsn);
// }

// // Hierarchical validation: checks whether parent HSNs exist
// function validateHierarchy(code, data) {
//   const levels = [2, 4, 6].filter(l => l < code.length);
//   const parents = levels.map(len => code.slice(0, len));
//   return parents.every(p => data.find(d => d.HSNCode === p));
// }


// async function validateHSN(hsnInput) {
//   try {
//     const hsns = Array.isArray(hsnInput) ? hsnInput : [hsnInput];
//     const results = [];
//     const data = loadHSNMasterData(); // Load only once for all validations

//     for (const hsnRaw of hsns) {
//       const hsn = hsnRaw.toString().trim();

//       if (!validateFormat(hsn)) {
//         results.push({
//           code: hsn,
//           valid: false,
//           reason: 'Invalid format - must be 2 to 8 numeric digits',
//           status: 400
//         });
//         continue;
//       }

//       const description = getHSNDescription(hsn);
//       const exists = !!description;
//       const hierarchyValid = validateHierarchy(hsn, data);

//       results.push({
//         code: hsn,
//         valid: exists && hierarchyValid,
//         description: exists ? description : undefined,
//         reason: !exists
//           ? 'No matching HSN code found'
//           : !hierarchyValid
//           ? 'Hierarchy broken - parent HSN code(s) missing'
//           : 'Exact match with valid hierarchy',
//         matchedLevel: hsn.length,
//         hierarchyValid,
//         status: exists && hierarchyValid ? 200 : 422
//       });
//     }

//     return hsns.length === 1 ? results[0] : results;
//   } catch (error) {
//     console.error("Validation error:", error);
//     return {
//       valid: false,
//       error: true,
//       message: 'Server error during validation',
//       details: error.message,
//       status: 500
//     };
//   }
// }

// module.exports = { validateHSN };

// fulfillment/validateHSN.js
const { getHSNDescription, loadHSNMasterData } = require('../entities/hsnEntity');

function validateFormat(hsn) {
  return typeof hsn === 'string' && /^\d{2,8}$/.test(hsn);
}

// Check parent codes exist in hierarchy for the given HSN code
function validateHierarchy(code, data) {
  // Valid parent levels for HSN codes: 2, 4, 6 digits (less than code length)
  const levels = [2, 4, 6].filter(len => len < code.length);
  const parents = levels.map(len => code.slice(0, len));
  return parents.every(p => data.find(d => d.HSNCode === p));
}

async function validateHSN(hsnInput) {
  try {
    const hsns = Array.isArray(hsnInput) ? hsnInput : [hsnInput];
    const data = loadHSNMasterData(); // load once
    const results = [];

    for (const rawHsn of hsns) {
      const hsn = rawHsn.toString().trim();

      if (!validateFormat(hsn)) {
        results.push({
          code: hsn,
          valid: false,
          reason: 'Invalid format - must be 2 to 8 numeric digits',
          status: 400
        });
        continue;
      }

      const description = getHSNDescription(hsn);
      const exists = !!description;
      const hierarchyValid = validateHierarchy(hsn, data);

      results.push({
        code: hsn,
        valid: exists && hierarchyValid,
        description: exists ? description : undefined,
        reason: !exists
          ? 'No matching HSN code found'
          : !hierarchyValid
          ? 'Hierarchy broken - parent HSN code(s) missing'
          : 'Exact match with valid hierarchy',
        matchedLevel: hsn.length,
        hierarchyValid,
        status: exists && hierarchyValid ? 200 : 422
      });
    }

    return hsns.length === 1 ? results[0] : results;
  } catch (error) {
    console.error("Validation error:", error);
    return {
      valid: false,
      error: true,
      message: 'Server error during validation',
      details: error.message,
      status: 500
    };
  }
}

module.exports = { validateHSN };
