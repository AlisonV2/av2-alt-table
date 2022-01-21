import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const createEvent = (eventName, data) => {
  axios
    .post(`${process.env.EVENT_SERVICE_URL}/events`, {
      event_name: eventName,
      shift_id: data.shift_id,
      content: data,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default createEvent;
