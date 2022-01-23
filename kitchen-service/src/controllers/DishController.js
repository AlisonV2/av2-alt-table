import Dish from '../models/DishModel';
import formatPrice from '../helpers/formatPrice';

const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json({
      message: 'Dishes fetched successfully',
      dishes: dishes,
    });
  } catch (err) {
    res.status(404).json({
      message: 'No dishes found',
    });
    res.status(400).json({
      message: 'Error while fetching dishes',
    });
  }
};

const createDish = (req, res) => {
  const price = formatPrice(req.body.price);
  const dish = new Dish({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: price,
    quantity: req.body.quantity,
  });

  try {
    dish.save((err, newDish) => {
      if (err) {
        res.status(400).json({
          message: 'Error creating dish',
        });
      } else {
        res.status(201).json({
          message: 'Dish created successfully',
          dish: newDish,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating dish',
    });
  }
};

const updateDishQuantity = async (req, res) => {
  try {
    const dish = await Dish.findOne({ name: req.params.name });
    if (dish) {
      dish.quantity = req.body.quantity;
      dish.save((err, updatedDish) => {
        if (err) {
          res.status(400).json({
            message: 'Error updating dish',
          });
        } else {
          res.status(200).json({
            message: 'Dish quantity updated successfully',
            dish: updatedDish,
          });
        }
      });
    } else {
      res.status(404).json({
        message: 'Dish not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'Error updating dish',
      error: err.message,
    });
  }
};

const getDishByName = async (req, res) => {
  try {
    const dish = await Dish.findOne({ name: req.params.name });
    if (dish) {
      res.status(200).json({
        message: 'Dish fetched successfully',
        dish: dish,
      });
    } else {
      res.status(404).json({
        message: 'Dish not found',
      });
    }
  } catch (err) {
    res.status(404).json({
      message: 'No dish found',
    });
    res.status(400).json({
      message: 'Error fetching dish',
    });
  }
};

export { createDish, updateDishQuantity, getDishByName, getDishes };
