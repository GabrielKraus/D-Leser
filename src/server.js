import express from 'express'
import { routerCarritos, routerProductos } from "./routers/index.js";
import controller from './controller/controller.js';
import { config } from './config/config.js';

const app = express();

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(config.server.routes.products, routerProductos);
app.use(config.server.routes.carts, routerCarritos);

controller();

const PORT = config.server.PORT;
const connectedServer = app.listen(PORT, function () {
    console.log(
        `Servidor Http escuchando en el puerto ${connectedServer.address().port
        }`
    );
});
connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
);


