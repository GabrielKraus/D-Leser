import express from 'express';
import os from 'os';
import __dirname from './utils.js';
import {fork} from 'child_process';
import compression from 'compression';
import winston from 'winston';
const app = express();
const logger = winston.createLogger({
    level: 'info',
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level: 'warn', filename:'./warn.log'}),
        new winston.transports.File({level: 'error', filename:'./error.log'})
    ]
})
const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))



app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public')
})

app.use(express.static(__dirname+'/public'))
app.use(compression())
app.get('/info',(req,res)=>{
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
app.get('/api/randoms', (req, res) => {
	const randomForked = fork(__dirname+'/random.js');
	let { cantidad } = req.query;
	let obj = {};
    if (isNaN(cantidad)) {
        logger.log('error', `${cantidad} no es un numero`)
        randomForked.send({ cantidad: 500000000, obj });
    } else {
        if(cantidad){
            randomForked.send({ cantidad, obj })
        }else{
            randomForked.send({ cantidad: 500000000, obj });
        }
    }
	randomForked.on('message', msg => res.send(msg));
});



