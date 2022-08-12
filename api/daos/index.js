
import { ProductMongo } from "./productDao.js";
import { CarritoMongo } from "./cartDao.js";

const ProductDao = new ProductMongo();
const CartDao = new CarritoMongo();

export { ProductDao, CartDao };
