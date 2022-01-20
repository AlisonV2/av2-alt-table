import express from 'express';
import { getTables } from '../controllers/TableController';

const router = express.Router();

router.get('/', getTables);

export { router as tableRouter };
