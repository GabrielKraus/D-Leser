class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre, 
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascota(){
        return Number(this.mascotas.length)
    }
    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }
    getBookNames(){
        let bookNames = [];
        this.libros.map((el)=>{
            bookNames.push(el.nombre)
        })
        return bookNames;
    }

}

let usuario = new Usuario ("Gabriel", "Alvarez", [{nombre: "libro1", autor:"autor1"},{nombre: "libro2", autor:"autor2"}], ["perro"])

console.log(usuario)

console.log(usuario.getFullName())  //llamando getFullName

usuario.addMascota("gato") //llamando addMascota

console.log(usuario.countMascota()) //llamando countMascota

usuario.addBook("libro3", "autor3") //llamando addBook

console.log(usuario.getBookNames()) //llamando getBookNames

console.log(usuario)




