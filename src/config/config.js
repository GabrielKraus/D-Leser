import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const config = {
    persistences: "mongo",
    MONGO_DB: {
        URL: process.env.MONGO_URL,
        DB_NAME: process.env.MONGO_DB_NAME,
    },
    server: {
        PORT: process.env.PORT ?? DEV_PORT,
        routes: {
            base: "/api",
            products: "/api/productos",
            carts: "/api/carritos",
        },
    },
};

export { config };