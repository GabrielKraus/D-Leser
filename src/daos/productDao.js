import { MongoContainer } from "../contenedores/MongoContainer.js";
import  {ProductoSchema}  from "../models/producto.js";

class ProductMongo extends MongoContainer {
    constructor() {
        super({ collection: "productos", schema: ProductoSchema });
    }
}

export { ProductMongo };
