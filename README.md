# WEB103 Project 2 - Campus Weekends

Submitted by: **Yingshu Wang**

About this web app: **Campus Weekends is a list-based web app that helps students explore six fictional campus activities, from acoustic music and outdoor walks to creative workshops and film nights. Users can search events, filter by category, and open individual detail pages. The app uses Express, Render PostgreSQL, vanilla HTML/CSS/JavaScript, and Pico CSS.**

Time spent: **6** hours (Project 2)

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **Data is supplied to the app using a Render PostgreSQL database**
  - [x] **The web app is connected to a Render PostgreSQL database**
  - [x] **The database contains an appropriately structured table for the list items**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view is a unique endpoint**, such as `localhost:3000/events/clay-and-coffee` and `localhost:3000/events/board-game-social`.
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

**Walkthrough reminder:** Keep the browser address bar visible when showing each detail page so its unique URL can be verified.

The following **stretch** functionality is completed:

- [x] Users can search for items with a specific attribute, using keyword search and category filtering.

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

[Watch the Project 2 video walkthrough on Google Drive](https://drive.google.com/file/d/1KFns-hpCta4hAPl7miIp1pxFYqxVOqTi/view?usp=sharing)

[Watch the previous Project 1 walkthrough on Google Drive](https://drive.google.com/file/d/1L14qfOzIjnTXCxSM1VcLQ6SbESGXCXuW/view?usp=sharing)

## Notes

The app separates the Express backend from the static frontend. The frontend fetches event data from JSON endpoints and renders it using native DOM methods. The server checks whether an event exists before serving its detail page, so invalid event URLs return an actual HTTP 404 response.

All six events are fictional demonstration data. Each event shares eleven fields: `id`, `slug`, `title`, `category`, `description`, `day`, `time`, `venue`, `price`, `organizer`, and `details`. The original data in `server/data/events.js` is now used only by the database seed script. Event routes query PostgreSQL. Every field is displayed on the detail page.

Pico CSS is installed through npm and served locally. The five automated route tests passed during implementation. Browser interactions and mobile appearance still need manual verification before submission.

### Run locally

Requires Node.js 20 or newer.

```sh
npm install
# Configure the root .env using .env.example before continuing.
npm run db:check
npm run db:seed
npm run dev
```

Open `http://localhost:3000`. Use `npm start` to run without automatic restarts, or `npm test` to run the automated checks.

## Changes Since Project 1

The same six campus activities and vanilla JavaScript interface are retained. The
main change is where the data comes from and how the backend is organized.

| Area | Project 1 | Project 2 |
| --- | --- | --- |
| Data source | JavaScript array | `events` table in Render PostgreSQL |
| List and detail API | Read the array directly | Query PostgreSQL through a `pg` connection pool |
| Project structure | Root server file with `public/`, `pages/`, and `data/` | Separate `client/` and `server/` folders, with routes, controllers, and configuration |
| Data setup | Import the data module | Create the schema and seed six records with `npm run db:seed` |
| Connection settings | No database configuration | Root `.env` loaded by `dotenv`, with credentials excluded from Git |
| Error handling | Missing routes and items return 404 | Retains 404 responses and adds 503 responses for database request failures |
| Search | Search and filter the original collection | Search and filter the collection retrieved from PostgreSQL |

### Database and seed behavior

`server/config/schema.sql` defines all eleven event fields. IDs are generated by
the database, slugs are unique, all fields are required, and prices must be
nonnegative whole-dollar amounts.

`server/data/events.js` is now seed data only. The seed script creates the table
if needed and inserts missing events in one transaction. Existing records are
preserved when the script is run again. Starting the server does not reset the
database. Event routes use SQL queries with parameters for slug lookups and do
not fall back to the JavaScript array.

### Configuration

Copy `.env.example` to `.env` at the repository root and fill in `PGHOST`, `PGPORT`,
`PGDATABASE`, `PGUSER`, and `PGPASSWORD` from Render's external connection details.
Use the complete external hostname for `PGHOST`, not the full connection URL.
The local computer's public IP must be allowed by the database's inbound rules.
Keep `PGSSLMODE=verify-full` for the external connection. Never commit `.env`.

`PORT` controls the Express server, while `PGPORT` controls the database connection.
An existing local PostgreSQL installation with a different port does not affect
these Render connection settings.

### Verification

The Render connection check succeeded, six events were seeded, and all five HTTP
integration tests passed against the live database on September 24, 2026. These
checks cover the collection, each detail endpoint, static resources, and 404
responses, including a SQL-injection-shaped slug returning 404.

Run `npm test` with a configured, reachable, seeded database. Tests perform
read-only HTTP checks; they do not seed or reset the database. Browser search
and mobile appearance have not been verified through automated browser tests.

The free Render instance created for this project reports an expiration date of
October 24, 2026.

## License

Copyright 2026 Yingshu Wang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
