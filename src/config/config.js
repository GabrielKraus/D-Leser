const config = {
    persistences: "mongo",
    MONGO_DB: {
        URL: "mongodb://localhost:27017",
        DB_NAME: "ecommerce",
    },
    server: {
        PORT: 8080,
        routes: { 
            base: "/api",
            products: "/api/productos",
            carts: "/api/carritos",
        },
    },
};

export default config ;