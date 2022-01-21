import Event from '../models/EventModel';

const createEvent = (req, res) => {
  const newEvent = new Event({
    type: req.body.event_name,
    shift_id: req.body.shift_id,
    content: req.body.content,
  });
  newEvent.save((err, event) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      res.status(400).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: 'Event created successfully',
        event: event,
      });
    }
  });
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.find({
      type: req.body.event_name,
      shift_id: req.body.shift_id,
    });
    if (!event) {
      res.status(500).json({
        message: err.message,
      });
      res.status(400).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        event: event,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
    res.status(400).json({
      message: err.message,
    });
  }
};

export { createEvent, getEvent };
