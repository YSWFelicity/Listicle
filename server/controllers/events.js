import path from 'node:path';
import { pool } from '../config/database.js';
import { pagesDirectory } from '../config/paths.js';

export async function getEvents(req, res) {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY id');
  res.json(rows);
}

export async function getEvent(req, res) {
  const { rows: [event] } = await pool.query('SELECT * FROM events WHERE slug = $1', [req.params.slug]);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

export async function getEventPage(req, res) {
  const { rows: [event] } = await pool.query('SELECT id FROM events WHERE slug = $1', [req.params.slug]);
  if (!event) return res.status(404).sendFile(path.join(pagesDirectory, '404.html'));
  res.sendFile(path.join(pagesDirectory, 'event.html'));
}
