let pool;
try {
  ({ pool } = await import('./database.js'));
  await pool.query('SELECT 1');
  console.log('Database connection successful. No data was changed.');
} catch {
  console.error('Database connection failed. Check the root .env settings, database availability, and network access.');
  process.exitCode = 1;
} finally {
  if (pool) await pool.end();
}
