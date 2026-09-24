const collection = document.querySelector('#events');
const status = document.querySelector('#list-status');
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const retry = document.querySelector('#retry');
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
let events = [];

// Use textContent so event data is displayed as text, never interpreted as HTML.
function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function createCard(event) {
  const card = document.createElement('article');
  card.className = 'event-card';
  const heading = document.createElement('header');
  heading.append(element('span', event.category, 'category-tag'));
  heading.append(element('span', event.price === 0 ? 'Free' : currency.format(event.price), 'event-price'));
  const title = document.createElement('h3');
  const link = element('a', event.title);
  link.href = `/events/${encodeURIComponent(event.slug)}`;
  title.append(link);
  card.append(heading, title, element('p', event.description));

  const attributes = document.createElement('dl');
  for (const [label, value] of [['When', `${event.day} · ${event.time}`], ['Where', event.venue], ['Hosted by', event.organizer]]) {
    attributes.append(element('dt', label), element('dd', value));
  }
  card.append(attributes);
  const footer = document.createElement('footer');
  const detailLink = element('a', 'Explore event →');
  detailLink.href = link.href;
  detailLink.setAttribute('aria-label', `Explore ${event.title}`);
  footer.append(detailLink);
  card.append(footer);
  return card;
}

function renderEvents() {
  const query = search.value.trim().toLowerCase();
  const matches = events.filter(event => {
    const searchable = [event.title, event.description, event.category, event.venue, event.day, event.organizer].join(' ').toLowerCase();
    return (!category.value || event.category === category.value) && searchable.includes(query);
  });
  collection.replaceChildren(...matches.map(createCard));
  status.textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? 'event' : 'events'} to explore`
    : 'No events match. Try another search or choose All categories.';
}

async function loadEvents() {
  retry.hidden = true;
  collection.setAttribute('aria-busy', 'true');
  status.textContent = 'Loading events…';
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    events = await response.json();
    const categories = [...new Set(events.map(event => event.category))].sort();
    category.replaceChildren(new Option('All categories', ''), ...categories.map(value => new Option(value, value)));
    search.disabled = false;
    category.disabled = false;
    renderEvents();
  } catch (error) {
    status.textContent = 'We couldn’t load the events. Please try again.';
    retry.hidden = false;
    console.error(error);
  } finally {
    collection.setAttribute('aria-busy', 'false');
  }
}

search.addEventListener('input', renderEvents);
category.addEventListener('change', renderEvents);
retry.addEventListener('click', loadEvents);
loadEvents();
