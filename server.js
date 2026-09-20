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

app.listen(port, () => {
  console.log(`Listicle is running at http://localhost:${port}`);
});
