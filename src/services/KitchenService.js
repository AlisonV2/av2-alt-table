import Dish from '../models/DishModel';
import Rating from '../models/RatingModel';
import formatPrice from '../helpers/formatPrice';

class KitchenService {
  static async getDishes() {
    return Dish.find();
  }

  static async getMenu() {
    return Dish.find({ quantity: { $gt: 0 } });
  }

  static async getDishByName(name) {
    const dish = await Dish.findOne({ name });
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish;
  }

  static async createDish(dish) {
    const { name, type, description, price, quantity } = dish;
    const formattedPrice = formatPrice(price);
    const newDish = new Dish({
      name,
      type,
      description,
      price: formattedPrice,
      quantity,
    });
    return newDish.save();
  }

  static async updateDishQuantity(name, quantity) {
    const dish = await Dish.findOne({ name });
    if (!dish) {
      throw new Error('Dish not found');
    }
    dish.quantity = quantity;
    return dish.save();
  }

  static async checkDishesForStock(dishes = []) {
    for (let i in dishes) {
      const dishData = await this.getDishByName(dishes[i].name);
      if (dishData.quantity === 0) {
        throw new Error('Dish is out of stock');
      }

      if (dishData.quantity < dishes[i].quantity) {
        throw new Error(
          `${dishes[i].name} is out of stock. Only ${dishData.quantity} left`
        );
      }
    }
  }

  static async getOrderPrice(dishes = []) {
    let orderPrice = 0;
    for (let i in dishes) {
      const dishData = await this.getDishByName(dishes[i].name);

      orderPrice += dishData.price * dishes[i].quantity;
      dishData.quantity -= dishes[i].quantity;

      await this.updateDishQuantity(dishData.name, dishData.quantity);
    }
    return orderPrice;
  }

  static async rateDish(shift_id, dish_name, table_number, comment, score) {
    await this.getDishByName(dish_name);

    const rating = new Rating({
      shift_id,
      dish_name,
      table_number,
      comment,
      score,
    });

    return rating.save();
  }

  static async getShiftRatings(shift_id, table_number) {
    return Rating.find({ shift_id, table_number });
  }
}

export default KitchenService;
