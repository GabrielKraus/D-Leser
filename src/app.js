const express = require('express');
const { fork } = require('child_process');


const app = express();

app.get('/info',(req,res)=>{
    let info = {
        inputArgs: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memUse: process.memoryUsage().rss,
        execPath: process.execPath,
        id: process.id,
        dirPath: process.cwd()
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



const server = app.listen(8080,()=>console.log(`Listening on port 8080`))