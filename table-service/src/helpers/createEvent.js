import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const createEvent = (eventName, plan) => {
  let event;
  axios
    .post(`${process.env.EVENT_SERVICE_URL}/events`, {
      event_name: eventName,
      shift_id: plan.shift_id,
      content: plan,
    })
    .then((response) => {
      event = response;
    })
    .catch((error) => {
      event = error.message;
    });
  return event;
};

export default createEvent;
