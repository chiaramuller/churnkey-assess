const crypto = require('crypto');

export default function (req, res, next) {
  if (req.method === 'POST' && req.url === '/api/generate-hash') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', () => {
      const { customerId } = JSON.parse(body);

      if (!customerId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing customerId' }));
        return;
      }

      const API_KEY = process.env.CHURNKEY_API_KEY;
      if (!API_KEY) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'API key is not set' }));
        return;
      }

      const userHash = crypto
        .createHmac('sha256', API_KEY)
        .update(customerId)
        .digest('hex');

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ userHash }));
    });
  } else {
    next();
  }
}
