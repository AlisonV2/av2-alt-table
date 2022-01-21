import SeatingPlan from '../models/SeatingPlanModel';
import createEvent from '../helpers/createEvent';

const createSeatingPlan = async (req, res) => {
  try {
    const seatingPlan = new SeatingPlan({
      shift_id: req.body.shift_id,
      tables: req.body.tables,
    });

    seatingPlan.save((err, plan) => {
      if (err) {
        res.status(400).send({
          message:
            err.message ||
            'Some error occurred while creating the SeatingPlan.',
        });
      } else {
        createEvent('SEATING_PLAN_CREATED', plan);
        res.status(201).send({
          message: 'SeatingPlan created successfully',
          seatingPlan: plan,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the SeatingPlan.',
    });
    res.status(400).send({
      message:
        err.message || 'Some error occurred while creating the SeatingPlan.',
    });
  }
  
};

const updateSeatingPlan = async (req, res) => {
  try {
    const tables = req.body.tables;

    const seatingPlan = await SeatingPlan.findById(req.params.id)
    if (seatingPlan) {
      seatingPlan.tables = tables;
      seatingPlan.save((err, updatedSeatingPlan) => {
        if (err) {
          res.status(400).json({
            message: 'Error updating seatingPlan',
          });
        } else {
          createEvent('SEATING_PLAN_UPDATED', updatedSeatingPlan);
          res.status(200).json({
            message: 'SeatingPlan updated successfully',
            seatingPlan: updatedSeatingPlan,
          });
        }
      });
    } else {
      res.status(404).json({
        message: 'Seating plan not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'Error updating seatingPlan',
      error: err.message,
    });
  }
};

const getSeatingPlanById = async (req, res) => {
  try {
    const seatingPlan = await SeatingPlan.findById(req.params.id);
    if (seatingPlan) {
      res.status(200).json({
        message: 'SeatingPlan fetched successfully',
        seatingPlan: seatingPlan,
      });
    } else {
      res.status(400).json({
        message: 'Error fetching SeatingPlan',
      });
    }
  } catch (err) {
    res.status(404).json({
      message: 'No SeatingPlan found',
    });
    res.status(400).json({
      message: 'Error fetching SeatingPlan',
    });
  }
};

export { createSeatingPlan, updateSeatingPlan, getSeatingPlanById };
