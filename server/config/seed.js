import { readFile } from 'node:fs/promises';
import { pool } from './database.js';
import events from '../data/events.js';

let client;
try {
  client = await pool.connect();
  await client.query('BEGIN');
  await client.query(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'));
  let inserted = 0;
  for (const event of events) {
    const result = await client.query(
      `INSERT INTO events (slug, title, category, description, day, time, venue, price, organizer, details)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (slug) DO NOTHING`,
      [event.slug, event.title, event.category, event.description, event.day,
        event.time, event.venue, event.price, event.organizer, event.details]
    );
    inserted += result.rowCount;
  }
  await client.query('COMMIT');
  console.log(`Seed complete: ${inserted} events inserted. Existing events were preserved.`);
} catch (error) {
  if (client) await client.query('ROLLBACK').catch(() => {});
  console.error(`Database seed failed (${error.code || 'connection error'}). Check configuration and database availability.`);
  process.exitCode = 1;
} finally {
  if (client) client.release();
  await pool.end();
}
