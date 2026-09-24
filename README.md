# WEB103 Project 1 - Campus Weekends

Submitted by: **Yingshu Wang**

About this web app: **Campus Weekends is a list-based web app that helps students explore six fictional campus activities, from acoustic music and outdoor walks to creative workshops and film nights. Users can search events, filter by category, and open individual detail pages. The app uses Express, vanilla HTML/CSS/JavaScript, and Pico CSS.**

Time spent: **6** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view is a unique endpoint**, such as `localhost:3000/events/clay-and-coffee` and `localhost:3000/events/board-game-social`.
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

**Walkthrough reminder:** Keep the browser address bar visible when showing each detail page so its unique URL can be verified.

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items.

The following **additional** features are implemented:

- [x] Keyword search across event titles, descriptions, categories, venues, days, and organizers.
- [x] Category filtering that works together with keyword search.
- [x] Responsive card layouts for desktop and mobile screens.
- [x] Loading indicators, empty-result messages, and retry buttons for failed data requests.
- [x] JSON API endpoints for the event collection and individual events.
- [x] Automated tests for event data, detail routes, static assets, and HTTP 404 responses.

## Video Walkthrough

Here's a walkthrough of implemented required features:

[Watch the Campus Weekends video walkthrough on Google Drive](https://drive.google.com/file/d/1L14qfOzIjnTXCxSM1VcLQ6SbESGXCXuW/view?usp=sharing)

## Notes

The app separates the Express backend from the static frontend. The frontend fetches event data from JSON endpoints and renders it using native DOM methods. The server checks whether an event exists before serving its detail page, so invalid event URLs return an actual HTTP 404 response.

All six events are fictional demonstration data. Each event shares eleven fields: `id`, `slug`, `title`, `category`, `description`, `day`, `time`, `venue`, `price`, `organizer`, and `details`. Data is currently stored in `server/data/events.js`, ready to move into a database in Unit 2. Every field is displayed on the detail page.

Pico CSS is installed through npm and served locally. The five automated route tests passed during implementation. Browser interactions and mobile appearance still need manual verification before submission.

### Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. Use `npm start` to run without automatic restarts, or `npm test` to run the automated checks.

## License

Copyright 2026 Yingshu Wang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Unit 2 Refactor Progress

This repository is being migrated to Render PostgreSQL in separate milestones.
The Project 1 checklist and video above document the original app.

- [x] Stage 1: Separate client/server files, extract routes/controllers, install `pg` and `dotenv`, and prepare database configuration.
- [ ] Stage 2: Create the Render PostgreSQL database and events table, seed the six events, and replace in-memory reads with SQL queries.
- [ ] Stage 3: Verify database-backed list/detail pages, search, error handling, and update the Project 2 submission documentation.

**Current state:** The app still serves its original JavaScript data. PostgreSQL is
not yet connected to the event routes, and the Unit 2 database requirement is not
complete. Normal startup does not reset or delete any database tables.

### Refactored structure

```text
client/
  public/            Homepage, CSS, and browser JavaScript
  pages/             Event detail and 404 HTML
server/
  server.js          Express entry point
  config/            Environment loading, file paths, database pool, connection check
  controllers/       Event request handlers
  routes/            API and page routes
  data/events.js     Original six events, to be used as seed data
.env.example         Database settings template without credentials
test/                HTTP regression tests
```

Keep running `npm run dev`, `npm start`, and `npm test` from the repository root.
The public URLs remain unchanged.

### Database configuration (for Stage 2)

Copy `.env.example` to `.env` and fill in the Render database's **external** host,
port, database, username, and password for local development. `.env` is ignored
by Git. Do not paste credentials into the README or commit them.

`PORT` controls the Express server; `PGPORT` controls the PostgreSQL connection.
A custom port on an existing local PostgreSQL server does not change the Render
connection settings. All five PG connection values must be provided explicitly,
so the app cannot silently default to an unrelated local database.

The external connection uses TLS with certificate verification
(`PGSSLMODE=verify-full`). Use `disable` only for a local database without TLS or
a Render internal connection. Environment variables already set by the host
are preserved when loading the root `.env` file.

After configuring the database, run `npm run db:check`. It executes only
`SELECT 1`, closes the pool, and reports success or failure without printing
credentials. It does not create, seed, or reset tables.

Connection configuration follows the [node-postgres connection documentation](https://node-postgres.com/features/connecting)
and [SSL documentation](https://node-postgres.com/features/ssl).
