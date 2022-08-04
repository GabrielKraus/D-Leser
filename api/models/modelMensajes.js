class ModelMensajes {
    constructor(tableName) {
        this.tableName = tableName
    }
    createTable = async(knex)=>{

        let tableStatus = await (knex.schema.hasTable(this.tableName))
        if(!tableStatus)
            {await knex.schema.createTable(this.tableName, table=>{
                table.string('email');
                table.string('mensaje');
                table.timestamp('timeStamp').defaultTo(knex.fn.now())
                table.increments('id').primary();
            })
            console.log(`tabla ${this.tableName} creada`)
        }else{
            console.log(`la tabla mensajes ya existe`)
        }
        
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                email: row["email"],
                mensaje: row["mensaje"],
                timeStamp: row["timeStamp"],
                id: row["id"]
            })
        }
        
        return list;
    }
    insertData = async (knex, email, mensaje) =>{
        await knex(this.tableName).insert(
            {email: email, mensaje: mensaje}
        )
    }
}

module.exports = ModelMensajes