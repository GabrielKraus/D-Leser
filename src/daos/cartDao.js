import { MongoContainer } from "../contenedores/MongoContainer.js";
import {CarritoModel} from "../models/carrito.js"

class CarritoMongo extends MongoContainer {
  constructor() {
    super({ collection: "carritos", schema: CarritoModel });
  }
}

export { CarritoMongo };
