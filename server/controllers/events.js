import path from 'node:path';
import events from '../data/events.js';
import { pagesDirectory } from '../config/paths.js';

// Stage 1 keeps the existing data source. Stage 2 replaces it with SQL queries.
export function getEvents(req, res) {
  res.json(events);
}

export function getEvent(req, res) {
  const event = events.find(event => event.slug === req.params.slug);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

export function getEventPage(req, res) {
  const event = events.find(event => event.slug === req.params.slug);
  if (!event) return res.status(404).sendFile(path.join(pagesDirectory, '404.html'));
  res.sendFile(path.join(pagesDirectory, 'event.html'));
}
