import mongoose from 'mongoose'
import { config } from '../config/config.js';

const controller = async () => {
    try {
        const URL = config.MONGO_DB.URL;
        let rta = mongoose.connect(URL, {
            dbName: config.MONGO_DB.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");


    } catch (error) {
        console.error("DB Error: ", error);
    }
};

export default controller