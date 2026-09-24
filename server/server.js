import express from 'express';
import path from 'node:path';
import './config/dotenv.js';
import { publicDirectory, pagesDirectory, picoDirectory } from './config/paths.js';
import { eventsApiRouter, eventPagesRouter } from './routes/events.js';

const app = express();
const port = process.env.PORT || 3000;

// Serve only the CSS distribution, rather than exposing all of node_modules.
app.use('/vendor/pico', express.static(picoDirectory));
app.use(express.static(publicDirectory));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/events', eventsApiRouter);
app.use('/events', eventPagesRouter);

// Unknown API paths return JSON; all other unmatched paths get an HTML 404.
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(pagesDirectory, '404.html'));
});

const server = app.listen(port, error => {
  if (error) {
    console.error('Unable to start Listicle:', error.message);
    process.exitCode = 1;
    return;
  }
  console.log(`Listicle is running at http://localhost:${server.address().port}`);
});
