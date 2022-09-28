import express from 'express';
import os from 'os';


const app = express();
const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))



app.get('/',(req,res)=>{
    res.send("info");
})

app.get('/info',(req,res)=>{
    let info = {
        inputArgs: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memUse: process.memoryUsage().rss,
        execPath: process.execPath,
        id: process.id,
        dirPath: process.cwd(),
        threadQnt: os.cpus().length
    }
    res.send(info);
})
app.get('/api/randoms', (req, res) => {
	const randomForked = fork(__dirname+'/random.js');
	let { cantidad } = req.query;
	let obj = {};
    if(cantidad){
        randomForked.send({ cantidad, obj })
    }else{
        randomForked.send({ cantidad: 500000000, obj });
    }
	randomForked.on('message', msg => res.send(msg));
});



