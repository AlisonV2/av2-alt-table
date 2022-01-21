import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// const response = await getEvent('SEATING_PLAN_CREATED', req.body.shift_id);
// if (!response.event.length) {
//   res.status(400).json({
//     error: 'No seating plan created',
//   });
//   return;
// }