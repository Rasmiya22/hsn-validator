// const { validateHSN } = require('../fulfillment/validateHSN');

// async function handle(body) {
//   try {
//     const hsn = body.queryResult?.parameters?.hsn;
//     if (!hsn) {
//       return {
//         fulfillmentText: "No HSN code provided",
//         status: 400
//       };
//     }

//     const result = await validateHSN(hsn);
    
//     if (result.error) {
//       return {
//         fulfillmentText: "Validation error occurred",
//         status: 500
//       };
//     }

//     return {
//       fulfillmentText: result.valid
//         ? `✅ Valid HSN: ${result.code}\n${result.description}`
//         : `❌ Invalid HSN: ${result.code}\nReason: ${result.reason}`,
//       ...result,
//       status: 200
//     };
//   } catch (error) {
//     console.error("Handler error:", error);
//     return {
//       fulfillmentText: "Server error occurred",
//       status: 500
//     };
//   }
// }

// module.exports = { handle };


// intents/validateHSNIntent.js
const { validateHSN } = require('../fulfillment/validateHSN');

async function handle(body) {
  try {
    const hsn = body.queryResult?.parameters?.hsn;
    if (!hsn) {
      return {
        fulfillmentText: "No HSN code provided",
        status: 400
      };
    }

    const result = await validateHSN(hsn);

    if (result.error) {
      return {
        fulfillmentText: "Validation error occurred",
        status: 500
      };
    }

    return {
      fulfillmentText: result.valid
        ? `✅ Valid HSN: ${result.code}\n${result.description}`
        : `❌ Invalid HSN: ${result.code}\nReason: ${result.reason}`,
      ...result,
      status: 200
    };
  } catch (error) {
    console.error("Handler error:", error);
    return {
      fulfillmentText: "Server error occurred",
      status: 500
    };
  }
}

module.exports = { handle };
