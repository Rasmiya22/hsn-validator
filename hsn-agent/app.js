// const express = require('express');
// const cors = require('cors');
// const { handle } = require('./intents/validateHSNIntent');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'running',
//     service: 'HSN Validation Agent',
//     version: '1.0.0'
//   });
// });

// // Webhook endpoint for HSN validation
// app.post('/webhook', async (req, res) => {
//   try {
//     console.log('Incoming request:', JSON.stringify(req.body, null, 2));
    
//     // Updated intent detection - handles both nested and flat structures
//     const intent = req.body.intent?.name || req.body.intent;
    
//     if (!intent) {
//       return res.status(400).json({
//         error: 'Missing intent',
//         details: 'Request must include an intent',
//         availableIntents: ['ValidateHSNIntent']
//       });
//     }

//     if (intent === 'ValidateHSNIntent') {
//       // Validate required parameters
//       if (!req.body.query) {
//         return res.status(400).json({
//           error: 'Missing HSN code',
//           details: 'Request must include a query parameter with HSN code'
//         });
//       }
      
//       const response = await handle(req.body);
//       console.log('Sending response:', response);
//       res.status(response.status || 200).json(response);
//     } else {
//       res.status(400).json({
//         error: 'Unsupported intent',
//         availableIntents: ['ValidateHSNIntent'],
//         status: 400
//       });
//     }
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({
//       error: 'Internal server error',
//       details: error.message,
//       status: 500
//     });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({
//     error: 'Internal server error',
//     details: err.message,
//     requestId: req.id
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`HSN Validation Agent running on http://localhost:${port}`);
//   console.log('Available endpoints:');
//   console.log(`- POST http://localhost:${port}/webhook`);
//   console.log(`- GET  http://localhost:${port}/`);
// });

// module.exports = app;

const express = require('express');
const cors = require('cors');
const { handle } = require('./intents/validateHSNIntent');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'running',
    service: 'HSN Validation Agent',
    version: '1.0.0'
  });
});

// Webhook endpoint for HSN validation
app.post('/webhook', async (req, res) => {
  try {
    console.log('Incoming request:', JSON.stringify(req.body, null, 2));
    
    const intent = req.body.intent?.name || req.body.intent;
    
    if (!intent) {
      return res.status(400).json({
        error: 'Missing intent',
        details: 'Request must include an intent',
        availableIntents: ['ValidateHSNIntent']
      });
    }

    if (intent === 'ValidateHSNIntent') {
      if (!req.body.query) {
        return res.status(400).json({
          error: 'Missing HSN code',
          details: 'Request must include a query parameter with HSN code'
        });
      }
      
      const response = await handle(req.body);
      console.log('Sending response:', response);
      res.status(response.status || 200).json(response);
    } else {
      res.status(400).json({
        error: 'Unsupported intent',
        availableIntents: ['ValidateHSNIntent'],
        status: 400
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
      status: 500
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message,
    requestId: req.id
  });
});

// Start server
app.listen(port, () => {
  console.log(`HSN Validation Agent running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log(`- POST http://localhost:${port}/webhook`);
  console.log(`- GET  http://localhost:${port}/`);
});

module.exports = app;
