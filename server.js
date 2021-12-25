import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import config from './config';
import logger from './logger';

dotenv.config();

const PORT = config.get('port');

app.set('port', PORT);
app.set('env', config.get('env'));
app.set('x-powered-by', false);

const server = http.createServer(app);

server.listen(PORT, config.get('ip'), () => {
  const addrInfo = server.address();
  logger.info(`Server running on //${addrInfo.address}:${addrInfo.port}`);
});
