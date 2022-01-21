import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const createEvent = (eventName, data) => {
  let event;
  axios
    .post(`${process.env.EVENT_SERVICE_URL}/events`, {
      event_name: eventName,
      shift_id: data.shift_id,
      content: data,
    })
    .then((response) => {
      event = response;
    })
    .catch((error) => {
      event = error;
    });
  return event;
};

export default createEvent;
