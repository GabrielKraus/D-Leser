import express from 'express';
import config from "./config/config.js";
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { routerCarritos } from './routes/cart.router.js';
import { routerProductos } from './routes/product.router.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
const app = express();


const connection = mongoose.connect(config.MONGO_DB.URL,{
    dbName: config.MONGO_DB.DB_NAME
})
let PORT = config.server.PORT
const server = app.listen(PORT,
    ()=>console.log(`server listening on port ${PORT}`)
)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static(__dirname+"/public"))

app.use(express.urlencoded({ extended: true }))
app.use(config.server.routes.products, routerProductos);
app.use(config.server.routes.carts, routerCarritos);

app.use(session({
    store:MongoStore.create({
        mongoUrl: config.MONGO_DB.URL,
        mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 100
    }),
    secret:"secreto",
    resave:false,
    saveUninitialized:false
}))


app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)

initializePassport();
app.use(passport.initialize());
app.use(passport.session())

