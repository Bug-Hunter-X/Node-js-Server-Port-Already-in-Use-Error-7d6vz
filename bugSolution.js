const http = require('http');
const portfinder = require('portfinder');

const requestListener = (request, response) => {
  response.writeHead(200);
  response.end('Hello, World!');
};

portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding a free port:', err);
    return;
  }

  const server = http.createServer(requestListener);

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error(`Server error:`, e);
    }
  });
});