# Listicle

A list-based web app using Express, vanilla HTML/CSS/JavaScript, and Pico CSS.
No frontend framework is used.

**Theme: Campus Weekends.** Browse six fictional campus activities, search by keyword,
and filter by category. All times, venues, and organizers are demonstration data.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use `npm start` to run without automatic restarts.
You can set the `PORT` environment variable to change the port.

## Project structure

```text
server.js             Express server and routes
data/events.js        Six sample events with a shared schema
public/index.html     Homepage
public/js/events.js   Fetch, render, search, and filter events
public/css/style.css  Custom styling layered on Pico CSS
```

Pico CSS is installed through npm and served locally by Express.
`GET /api/health` returns `{ "status": "ok" }` to check that the server is running.
`GET /api/events` returns the event collection as JSON.

Each event has `id`, `slug`, `title`, `category`, `description`, `day`, `time`,
`venue`, `price` (USD), `organizer`, and `details`. The homepage displays the title,
category, description, day, time, venue, price, and organizer. Detail pages will
display all fields in Part 3.

## Incremental milestones

- [x] Part 1: Express server, static homepage, Pico CSS, and npm scripts.
- [x] Part 2: Shared data attributes, at least five unique items, and list rendering.
- [ ] Part 3: Individual detail pages, custom 404 responses, and final verification.

Parts 1 and 2 are complete. Detail links/pages and a custom 404 remain for Part 3.
Data lives in a JavaScript module, ready to move into a database in Unit 2.

## References

- [Express static files](https://expressjs.com/en/starter/static-files/)
- [Pico CSS documentation](https://picocss.com/docs)
