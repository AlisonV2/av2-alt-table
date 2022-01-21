import express from 'express';
import { createEvent, getEvent } from '../controllers/EventController';

const router = express.Router();

router.post('/events', createEvent);
router.post('/event', getEvent)

export { router as eventsRouter };
