import express from 'express';
import os from 'os';
import __dirname from './utils.js';
import compression from 'compression';
import winston from 'winston';
import crypto from 'crypto'
const app = express();
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ level: 'warn', filename: './warn.log' }),
        new winston.transports.File({ level: 'error', filename: './error.log' })
    ]
})
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public')
})

app.use(express.static(__dirname + '/public'))
app.use(compression())
app.get('/info', (req, res) => {
    let info = {
        inputArgs: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memUse: process.memoryUsage().rss,
        execPath: process.execPath,
        id: process.id,
        dirPath: process.cwd(),
        threadQnt: os.cpus().length,
        serverInfo: `Servidor con pid ${process.pid} atendiendo petición nuevamente en puerto ${PORT}`
    }
    res.send(info);
})
app.get('/api/primo/:numero', (req, res) => {
    let num=req.params.numero

    function isPrime(n) {
        if (n<=1) return false;
        for (var i = 2; i <= n-1; i++)
            if (n % i == 0) return false;
        return true;
    }

    if (isNaN(num)) {
        logger.log('error', `${num} no es un numero`)
        res.send(`${num} no es un numero`)
    }else{
        isPrime(num) ? res.send(`${num} es un numero primo`) : res.send(`${num} no es un numero primo`)

    }

    

    
});

