require('dotenv').config();
const http = require('http');
const app = require('./app');
const config = require('./config');
const logger = require('./logger');

const PORT = config.get('port');

app.set('port', PORT);
app.set('env', config.get('env'));
app.set('x-powered-by', false);

const server = http.createServer(app);

server.listen(PORT, config.get('ip'), () => {
  const addrInfo = server.address();
  logger.info(`Server running on http://${addrInfo.address}:${addrInfo.port}`);
});
