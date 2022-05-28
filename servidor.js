const express = require('express')

const app = express()

const PORT = 8081

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send("<h1>Bienbenidos al servidor express</h1>")
})
