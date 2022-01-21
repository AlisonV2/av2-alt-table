import axios from 'axios';

const createEvent = async (eventName, shiftId, eventData) => {
  try {
    const { data } = await axios.post(
      `${process.env.EVENT_SERVICE_URL}/events`,
      {
        event_name: eventName,
        shift_id: shiftId,
        content: eventData,
      }
    );
    return data;
  } catch (err) {
    return new Error(err.message);
  }
};

export { createEvent };