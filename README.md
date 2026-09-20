# Listicle

A list-based web app using Express, vanilla HTML/CSS/JavaScript, and Pico CSS.
No frontend framework is used.

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
public/index.html     Homepage
public/css/style.css  Custom styling layered on Pico CSS
```

Pico CSS is installed through npm and served locally by Express.
`GET /api/health` returns `{ "status": "ok" }` to check that the server is running.

## Incremental milestones

- [x] Part 1: Express server, static homepage, Pico CSS, and npm scripts.
- [ ] Part 2: Shared data attributes, at least five unique items, and list rendering.
- [ ] Part 3: Individual detail pages, custom 404 responses, and final verification.

This first milestone is a working foundation, not the completed assignment.
Data will initially live in a JavaScript module, ready to move into a database in Unit 2.

## References

- [Express static files](https://expressjs.com/en/starter/static-files/)
- [Pico CSS documentation](https://picocss.com/docs)
