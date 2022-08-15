import { MongoContainer } from "../contenedores/MongoContainer.js";
import {CarritoSchema} from "../models/carrito.js"

class CarritoMongo extends MongoContainer {
  constructor() {
    super({ collection: "carritos", schema: CarritoSchema });
  }
}

export { CarritoMongo };
