import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
dotenv.config();

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  ENVIRONMENT: Joi.string()
    .valid('development', 'production', 'staging')
    .required(),
  PORT: Joi.number().port().required(),
  CORS_CLIENT_URLS: Joi.string().required(),
  //   SELF_API_URL: Joi.string().required(),
  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRES_IN: Joi.number().integer().required(),
  // database
  DATABASE_HOST: Joi.string().hostname().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  AMQP_HOST: Joi.string().required(),
  AMQP_PORT: Joi.string().required(),
  AMQP_USERNAME: Joi.string().required(),
  AMQP_PASSWORD: Joi.string().required(),
  // redis
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
  env: process.env.NODE_ENV,
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 10),
  corsClientUrls:
    process.env.CORS_CLIENT_URLS.length === 1
      ? process.env.CORS_CLIENT_URLS
      : process.env.CORS_CLIENT_URLS.split(','),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN, 10),
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  },
  amqp: {
    hostname: process.env.AMQP_HOST,
    port: parseInt(process.env.AMQP_PORT, 10),
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
  },
});

export const validationOptions = {
  abortEarly: true,
};
