import { createLogger, format, transports } from 'winston';
import config from './config';

const ENV = config.get('env');

const stringFormat = format.printf(
  // eslint-disable-next-line object-curly-newline
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (metadata) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  },
);

const logger = createLogger({
  level: ENV !== 'production' ? 'debug' : 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/all.log' }),
  ],
});

if (ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        stringFormat,
      ),
    }),
  );
}

module.exports = logger;
