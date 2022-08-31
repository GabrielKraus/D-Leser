import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const config = {
    persistences: "mongo",
    MONGO_DB: {
        URL: "mongodb://localhost:27017",
        DB_NAME: "ecommerce",
    },
    server: {
        PORT: 8080 ?? DEV_PORT,
        routes: {
            base: "/api",
            products: "/api/productos",
            carts: "/api/carritos",
        },
    },
};

export { config };