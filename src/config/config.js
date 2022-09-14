import dotenv from 'dotenv'
import minimist from 'minimist'

dotenv.config()

const args = minimist(process.argv.slice(2),{alias:{p:"PORT"},default:{p:8080}});


const config = {
    persistences: "mongo",
    MONGO_DB: {
        URL: process.env.URL || "mongodb://localhost:27017",
        DB_NAME: "ecommerce",
    },
    server: {
        PORT: args.PORT,
        routes: { 
            base: "/api",
            products: "/api/productos",
            carts: "/api/carritos",
        },
    },
};

export default config ;