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

**TODO: Add the walkthrough GIF or video link before submitting.**

Here's where the walkthrough of implemented required features will be added:

<!-- Replace the placeholder below with the actual GIF path or URL, then remove the comment markers.
<img src="YOUR_GIF_PATH_OR_URL" title="Video Walkthrough" width="800" alt="Video walkthrough of Campus Weekends" />
-->

GIF created with: **TODO: Add the tool used to record the walkthrough.**

Suggested recording sequence:

1. Show the homepage title and all six event cards.
2. Search for `clay`, clear the search, and demonstrate the Music category filter.
3. Reset the filters and open event detail pages, keeping each unique URL visible.
4. Show all fields on a detail page, refresh it, and return to the collection.
5. Visit `/events/not-a-real-event` and `/missing` to demonstrate the custom 404 page.

## Notes

The app separates the Express backend from the static frontend. The frontend fetches event data from JSON endpoints and renders it using native DOM methods. The server checks whether an event exists before serving its detail page, so invalid event URLs return an actual HTTP 404 response.

All six events are fictional demonstration data. Each event shares eleven fields: `id`, `slug`, `title`, `category`, `description`, `day`, `time`, `venue`, `price`, `organizer`, and `details`. Data is currently stored in `data/events.js`, ready to move into a database in Unit 2. Every field is displayed on the detail page.

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
