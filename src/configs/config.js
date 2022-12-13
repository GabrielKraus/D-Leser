import dotenv from "dotenv";
import mongoose from "mongoose";
import loggers from '../utils/loggers/logger.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? loggers.error("No se pudo conectar a MongoDB")
        : loggers.info("Se pudo conectar a MongoDB")
})

export default mongoose;
