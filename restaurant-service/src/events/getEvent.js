import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getEvent = async (eventName, shiftId) => {
  try {
    const { data } = await axios.post(
      `${process.env.EVENT_SERVICE_URL}/event`,
      {
        event_name: eventName,
        shift_id: shiftId,
      }
    );
    return data;
  } catch (err) {
    return new Error(err.message);
  }
};

export default getEvent;