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
public/js/event.js    Fetch and display all fields for one event
public/css/style.css  Custom styling layered on Pico CSS
pages/event.html      Detail page served for valid event slugs
pages/404.html        Custom page for unmatched routes
```

Pico CSS is installed through npm and served locally by Express.
`GET /api/health` returns `{ "status": "ok" }` to check that the server is running.
`GET /api/events` returns the event collection as JSON.
`GET /api/events/:slug` returns one event, or a JSON error with HTTP 404.
`GET /events/:slug` serves an event detail page, or the custom page with HTTP 404.
Unknown API routes return JSON 404 errors; other unmatched routes return the styled 404 page.

Each event has `id`, `slug`, `title`, `category`, `description`, `day`, `time`,
`venue`, `price` (USD), `organizer`, and `details`. The homepage displays the title,
category, description, day, time, venue, price, and organizer. Detail pages
display all eleven fields, including the ID, slug, and extended details.

## Incremental milestones

- [x] Part 1: Express server, static homepage, Pico CSS, and npm scripts.
- [x] Part 2: Shared data attributes, at least five unique items, and list rendering.
- [x] Part 3: Individual detail pages and custom 404 responses.

All three implementation milestones are complete.
Data lives in a JavaScript module, ready to move into a database in Unit 2.

## Verification

Run `npm test` to check the six events, shared fields, detail routes, static assets,
and HTTP 404 responses using Node's built-in test runner.

For a manual browser check:

1. Open `/` and confirm six cards appear with Pico CSS styling.
2. Search for `clay`, filter by `Music`, and try a search with no matches.
3. Clear the filters and click an event title or **Explore event**.
4. Confirm all event fields appear, refresh the detail URL, and use the back link.
5. Visit `/events/not-a-real-event` and `/missing` to view the custom 404.
6. Check the list and detail pages at a narrow mobile width.

Example detail URL: http://localhost:3000/events/clay-and-coffee

## References

- [Express static files](https://expressjs.com/en/starter/static-files/)
- [Pico CSS documentation](https://picocss.com/docs)
