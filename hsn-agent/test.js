const hsnEntity = require('./entities/hsnEntity');

async function test() {
  try {
    console.log("Starting HSN data loading test...");
    
    // Test file loading
    const data = hsnEntity.loadHSNMasterData();
    console.log(`Loaded ${data.length} entries`);
    console.log("Sample entry:", data[0]);
    
    // Test description lookup
    const testCodes = ["0101", "invalid", "010110", ""];
    testCodes.forEach(code => {
      try {
        const desc = hsnEntity.getHSNDescription(code);
        console.log(`Code ${code}:`, desc || "Not found");
      } catch (error) {
        console.log(`Code ${code}: Error -`, error.message);
      }
    });
    
    console.log("Test completed");
  } catch (error) {
    console.error("Test failed:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
  }
}

test();