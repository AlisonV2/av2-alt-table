import Dish from '../models/DishModel';

const getMenu = async (req, res) => {
  try {
    const dishes = await Dish.find({ quantity: { $gt: 0 } });
    res.status(200).json({
      message: 'Dishes fetched successfully',
      dishes: dishes,
    });
  } catch (err) {
    res.status(400).json({
      message: 'No menu found',
    });
  }
};

export { getMenu };