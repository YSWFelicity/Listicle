import { Router } from 'express';
import { getEvents, getEvent, getEventPage } from '../controllers/events.js';

export const eventsApiRouter = Router();
eventsApiRouter.get('/', getEvents);
eventsApiRouter.get('/:slug', getEvent);

export const eventPagesRouter = Router();
eventPagesRouter.get('/:slug', getEventPage);
