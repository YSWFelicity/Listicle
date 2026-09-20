import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { before, after, test } from 'node:test';
import events from '../data/events.js';

let server;
let baseUrl;

before(async () => {
  // Let the OS choose an available port so tests do not interrupt the dev server.
  server = spawn(process.execPath, ['server.js'], {
    cwd: new URL('../', import.meta.url),
    env: { ...process.env, PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  await new Promise((resolve, reject) => {
    let output = '';
    let errors = '';
    const timeout = setTimeout(() => reject(new Error('Server startup timed out')), 10000);
    server.stderr.on('data', chunk => { errors += chunk; });
    server.once('error', error => { clearTimeout(timeout); reject(error); });
    server.once('exit', code => {
      clearTimeout(timeout);
      reject(new Error(`Server exited (${code}): ${errors}`));
    });
    server.stdout.on('data', chunk => {
      output += chunk;
      const match = output.match(/http:\/\/localhost:(\d+)/);
      if (match) {
        baseUrl = `http://127.0.0.1:${match[1]}`;
        clearTimeout(timeout);
        resolve();
      }
    });
  });
});

after(async () => {
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
});

test('collection includes at least five unique, consistently shaped events', async () => {
  const response = await fetch(`${baseUrl}/api/events`);
  assert.equal(response.status, 200);
  const collection = await response.json();
  assert.deepEqual(collection, events);
  assert.ok(collection.length >= 5);
  assert.equal(new Set(collection.map(event => event.id)).size, collection.length);
  assert.equal(new Set(collection.map(event => event.slug)).size, collection.length);
  const fields = ['id', 'slug', 'title', 'category', 'description', 'day', 'time', 'venue', 'price', 'organizer', 'details'].sort();
  for (const event of collection) {
    assert.deepEqual(Object.keys(event).sort(), fields);
    assert.ok(Number.isFinite(event.price) && event.price >= 0);
    for (const field of fields.filter(field => !['id', 'price'].includes(field))) {
      assert.equal(typeof event[field], 'string');
      assert.ok(event[field].trim());
    }
  }
});

test('every detail URL loads directly and has a matching complete API record', async () => {
  for (const event of events) {
    for (const suffix of ['', '/']) {
      const response = await fetch(`${baseUrl}/events/${event.slug}${suffix}`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /text\/html/);
      assert.match(await response.text(), /id="event-title"/);
    }
    const response = await fetch(`${baseUrl}/api/events/${event.slug}`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), event);
  }
});

test('unknown pages and events return the styled HTML 404', async () => {
  for (const route of ['/missing', '/events/not-a-real-event', '/events', '/events/clay-and-coffee/extra']) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 404, route);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.match(html, /404/);
    assert.match(html, /Explore all events/);
    assert.match(html, /pico.min.css/);
  }
});

test('unknown API paths return JSON with HTTP 404', async () => {
  for (const route of ['/api/events/missing', '/api/missing']) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type'), /application\/json/);
    assert.equal(typeof (await response.json()).error, 'string');
  }
});

test('homepage, scripts, and styles are served successfully', async () => {
  for (const [route, type] of [
    ['/', /text\/html/],
    ['/js/events.js', /javascript/],
    ['/js/event.js', /javascript/],
    ['/css/style.css', /text\/css/],
    ['/vendor/pico/pico.min.css', /text\/css/]
  ]) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), type);
    assert.ok((await response.text()).length > 0);
  }
});
