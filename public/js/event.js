const eventSection = document.querySelector('#event');
const status = document.querySelector('#detail-status');
const retry = document.querySelector('#retry');
const slug = window.location.pathname.split('/').filter(Boolean).pop();
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

async function loadEvent() {
  retry.hidden = true;
  status.textContent = 'Loading event…';
  eventSection.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(`/api/events/${slug}`);
    if (response.status === 404) {
      status.textContent = 'This event is no longer available. Use the link above to explore other events.';
      return;
    }
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const event = await response.json();
    document.title = `${event.title} | Campus Weekends`;
    document.querySelector('#event-title').textContent = event.title;
    document.querySelector('#event-category').textContent = event.category;
    document.querySelector('#event-description').textContent = event.description;
    document.querySelector('#event-details').textContent = event.details;

    const attributes = document.querySelector('#event-attributes');
    attributes.replaceChildren();
    for (const [label, value] of [
      ['Day', event.day],
      ['Time', event.time],
      ['Venue', event.venue],
      ['Price (USD)', event.price === 0 ? 'Free ($0)' : currency.format(event.price)],
      ['Organizer', event.organizer],
      ['Event ID', event.id],
      ['Slug', event.slug]
    ]) {
      const group = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = label;
      definition.textContent = value;
      group.append(term, definition);
      attributes.append(group);
    }
    eventSection.hidden = false;
    status.textContent = '';
  } catch (error) {
    status.textContent = 'We couldn’t load this event. Please try again.';
    retry.hidden = false;
    console.error(error);
  } finally {
    eventSection.setAttribute('aria-busy', 'false');
  }
}

retry.addEventListener('click', loadEvent);
loadEvent();
