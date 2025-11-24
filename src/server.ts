import express from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import server from './tools.js';

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  res.on('close', () => transport.close());
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, (error?: Error | null) => {
  if (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }

  console.log(`MCP Server running on http://localhost:${port}/mcp`);
},);

// Handle signal termination
process.on('SIGINT', () => {
  console.log('SIGINT signal received. Shutting down gracefully...');
  server.close().then(() => {
    console.log('Server closed');
    process.exit(0);
  }).catch((error) => {
    console.error('Error shutting down server:', error);
    process.exit(1);
  });
});
