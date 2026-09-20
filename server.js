import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import events from './data/events.js';

const app = express();
const port = process.env.PORT || 3000;
const directory = path.dirname(fileURLToPath(import.meta.url));

// Serve only the CSS distribution, rather than exposing all of node_modules.
app.use('/vendor/pico', express.static(path.join(directory, 'node_modules/@picocss/pico/css')));
app.use(express.static(path.join(directory, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/events/:slug', (req, res) => {
  const event = events.find(event => event.slug === req.params.slug);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

app.get('/events/:slug', (req, res) => {
  const event = events.find(event => event.slug === req.params.slug);
  if (!event) return res.status(404).sendFile(path.join(directory, 'pages/404.html'));
  res.sendFile(path.join(directory, 'pages/event.html'));
});

// Unknown API paths return JSON; all other unmatched paths get an HTML 404.
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(directory, 'pages/404.html'));
});

const server = app.listen(port, error => {
  if (error) {
    console.error('Unable to start Listicle:', error.message);
    process.exitCode = 1;
    return;
  }
  console.log(`Listicle is running at http://localhost:${server.address().port}`);
});
