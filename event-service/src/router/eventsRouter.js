import express from 'express';
import { createEvent } from '../controllers/Receiver';

const router = express.Router();

router.post('/events', createEvent)

export { router as eventsRouter };
