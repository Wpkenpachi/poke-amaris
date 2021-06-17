import 'dotenv/config';

export const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  PORT,
  SECRET,
  EXPIRES_IN,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
} = process.env;