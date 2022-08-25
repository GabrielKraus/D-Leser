const faker = require("faker");
faker.locale = 'es'
const { name, internet, datatype, hacker, image, lorem } = faker;


let mensajes = []
for (let i = 0; i < 2; i++) {

    mensajes[i] = JSON.stringify(
        {
            author: {
                id: internet.email(),
                nombre: name.firstName(),
                apellido: name.lastName(),
                edad: datatype.number(),
                alias: name.jobTitle(),
                avatar: image.avatar()
            },
            text: lorem.word()
        }
    )
}





module.exports = mensajes 