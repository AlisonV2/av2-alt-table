import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getEvent = async (eventName, shiftId) => {
  let event;
  try {
    const { data } = await axios.post(
      `${process.env.EVENT_SERVICE_URL}/event`,
      {
        event_name: eventName,
        shift_id: shiftId,
      }
    );
    event = data;
  } catch (err) {
    event = err.message;
  }
  return event;
};

export default getEvent;