const faker = require("faker");
faker.locale = 'es'
const {commerce, image} = faker;


let productos = []
for (let i=0; i<5; i++){

    productos[i] = {
        title: commerce.productName(),
        price: commerce.price(),
        thumbnail: image.imageUrl()
    }
}




module.exports = productos 