import { MongoContainer } from "../contenedores/MongoContainer.js";
import  {ProductModel}  from "../models/producto.js";

class ProductMongo extends MongoContainer {
    constructor() {
        super({ collection: "productos", schema: ProductModel });
    }
}

export { ProductMongo };
