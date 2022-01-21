import dotenv from 'dotenv';
import axios from 'axios';
import checkDuplicatedTables from '../helpers/checkDuplicatedTables';

dotenv.config();

const createSeatingPlan = async (req, res) => {
  const isDuplicated = checkDuplicatedTables(req.body.tables);

  if (isDuplicated) {
    res.status(400).json({
      error: 'Duplicated table number',
    });
    return;
  }

  try {
    const { data } = await axios.post(
      `${process.env.TABLE_SERVICE_URL}/seating-plan`,
      req.body
    );
    res.status(200).json({
      message: 'Seating plan created successfully',
      data: data.seatingPlan,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating Seating plan',
    });
  }
};

const updateSeatingPlan = async (req, res) => {
  try {
    const { data } = await axios.put(
      `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.params.id}`,
      req.body
    );
    res.status(200).json({
      message: 'Seating plan updated successfully',
      data: data.seatingPlan,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error updating Seating plan',
    });
  }
};

const getSeatingPlanById = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.TABLE_SERVICE_URL}/seating-plan/${req.params.id}`
    );
    res.status(200).json({
      message: 'Seating plan fetched successfully',
      seatingPlan: data,
    });
  } catch (err) {
    res.status(400).json({
      message: 'No seating plan found',
    });
  }
};

export { createSeatingPlan, updateSeatingPlan, getSeatingPlanById };
