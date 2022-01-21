import axios from 'axios';

const createEvent = async (eventName, shiftId, eventData) => {
  let event;
  try {
    const { data } = await axios.post(
      `${process.env.EVENT_SERVICE_URL}/events`,
      {
        event_name: eventName,
        shift_id: shiftId,
        content: eventData,
      }
    );
    event = data;
  } catch (err) {
    event = err.message;
  }
  return event;
};

export { createEvent };
