import mongoose from 'mongoose'
const controller = async () => {
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");


    } catch (error) {
        console.error("DB Error: ", error);
    }
};

export default controller