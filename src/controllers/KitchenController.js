import KitchenService from '../services/KitchenService';

class KitchenController {
  static async getDishes(req, res) {
    try {
      await KitchenService.getDishes();
      res.status(200).json({
        message: 'Dishes fetched successfully',
        dishes: dishes,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error while fetching dishes',
      });
    }
  }

  static async getMenu(req, res) {
    try {
      const dishes = await KitchenService.getMenu();
      res.status(200).json({
        message: 'Dishes fetched successfully',
        dishes: dishes,
      });
    } catch (err) {
      res.status(400).json({
        message: 'No menu found',
      });
    }
  }

  static async createDish(req, res) {
    try {
      const newDish = await KitchenService.createDish(req.body);
      res.status(201).json({
        message: 'Dish created successfully',
        dish: newDish,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error creating dish',
      });
    }
  }

  static async updateDishQuantity(req, res) {
    const { name, quantity } = req.body;
    try {
      const newDish = await KitchenService.updateDishQuantity(name, quantity);
      res.status(200).json({
        message: 'Dish quantity updated successfully',
        dish: newDish,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error updating dish',
        error: err.message,
      });
    }
  }
}

export default KitchenController;
