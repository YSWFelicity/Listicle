import './dotenv.js';
import pg from 'pg';

// Require explicit settings to avoid connecting to an unrelated local database.
const required = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) throw new Error(`Missing database settings: ${missing.join(', ')}. Fill in the root .env file.`);

const port = Number(process.env.PGPORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PGPORT must be a valid port number.');
const sslMode = process.env.PGSSLMODE || 'verify-full';
if (!['verify-full', 'disable'].includes(sslMode)) throw new Error('PGSSLMODE must be verify-full or disable.');

export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: sslMode === 'disable' ? false : { rejectUnauthorized: true },
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

pool.on('error', () => {
  console.error('An idle database connection failed. Check the database status and network connection.');
});
