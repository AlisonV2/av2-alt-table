import getMenu from './kitchen-service/getMenu';
import getDishes from './kitchen-service/getDishes';
import getDishByName from './kitchen-service/getDishByName';
import createDish from './kitchen-service/createDish';
import updateDishQuantity from './kitchen-service/updateDishQuantity';
import rateDish from './kitchen-service/rateDish';

const KitchenService = {
    getMenu,
    getDishes,
    getDishByName,
    createDish,
    updateDishQuantity,
    rateDish
};

export default KitchenService;