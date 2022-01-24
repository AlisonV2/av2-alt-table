import SeatingPlan from '../models/SeatingPlanModel';
import checkDuplicatedTables from '../../helpers/checkDuplicatedTables';
import checkNegativeNumbers from '../../helpers/checkNegativeNumbers';

const createSeatingPlan = async (req, res) => {
  const isDuplicated = checkDuplicatedTables(req.body.tables);
  const isNegative = checkNegativeNumbers(req.body.tables);

  if (isDuplicated || isNegative) {
    res.status(400).json({
      error: 'Invalid tables',
    });
    return;
  }

  try {
    const seatingPlan = new SeatingPlan({
      shift_id: req.body.shift_id,
      tables: req.body.tables,
    });

    seatingPlan.save((err, plan) => {
      if (err) {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(201).send({
          message: 'SeatingPlan created successfully',
          seatingPlan: plan,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
    res.status(400).send({
      message: err.message,
    });
  }
};

const updateSeatingPlan = async (req, res) => {
  const isDuplicated = checkDuplicatedTables(req.body.tables);
  const isNegative = checkNegativeNumbers(req.body.tables);

  if (isDuplicated || isNegative) {
    return res.status(400).json({
      error: 'Invalid tables',
    });
  }

  try {
    const tables = req.body.tables;

    const seatingPlan = await SeatingPlan.findOne({
      shift_id: req.body.shift_id,
    });
    if (seatingPlan) {
      seatingPlan.tables = tables;
      seatingPlan.save((err, updatedSeatingPlan) => {
        if (err) {
          res.status(400).json({
            message: 'Error updating seatingPlan',
          });
        } else {
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


export { createSeatingPlan, updateSeatingPlan };
