const convict = require('convict');
const { existsSync } = require('fs');
const convictFormatWithValidator = require('convict-format-with-validator');

convict.addFormats(convictFormatWithValidator);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  accessTokenExpiration: {
    doc: 'The access token default expiration time in seconds',
    format: 'integer',
    default: 300, // 5 minutes
    env: 'ACCESS_TOKEN_EXPIRATION',
  },
  refreshTokenExpiration: {
    doc: 'The refresh token default expiration time in seconds',
    format: 'integer',
    default: 1209600, // 2 weeks
    env: 'REFRESH_TOKEN_EXPIRATION',
  },
  host: {
    doc: 'The server host name',
    format: String,
    default: 'localhost:3000',
    env: 'HOST',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
      env: 'DATABASE_HOST',
    },
    client: {
      doc: 'Database client',
      format: '*',
      default: 'mysql2',
      env: 'DATABASE_CLIENT',
    },
    port: {
      doc: 'The port the db server',
      format: 'port',
      default: 3306,
      env: 'DATABASE_PORT',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'ronda',
      env: 'DATABASE_NAME',
    },
    username: {
      doc: 'Database user',
      format: String,
      default: 'dev',
      env: 'DATABASE_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'dev',
      env: 'DATABASE_PASSWORD',
    },
  },
  email: {
    defaultFrom: {
      doc: 'Default Email from address',
      format: 'email',
      default: 'hello@example.dev',
      env: 'EMAIL_FROM',
    },
    host: {
      doc: 'SMTP host',
      format: '*',
      default: 'localhost',
      env: 'EMAIL_HOST',
    },
    port: {
      doc: 'SMTP port',
      format: 'port',
      default: 2525,
      env: 'EMAIL_PORT',
    },
    user: {
      doc: 'SMTP user',
      format: String,
      default: 'root',
      env: 'EMAIL_USER',
    },
    pass: {
      doc: 'SMTP pass',
      format: String,
      default: 'root',
      env: 'EMAIL_PASS',
    },
  },
});

const configFilePath = `./config/${config.get('env')}.json`;
if (existsSync(configFilePath)) {
  config.loadFile(configFilePath);
}

config.validate({ allowed: 'strict' });

module.exports = config;
