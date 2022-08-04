class ModelProductos {
    constructor(tableName) {
        this.tableName = tableName
    }
    createTable = async(knex)=>{

        let tableStatus = await (knex.schema.hasTable(this.tableName))
        if(!tableStatus)
            {await knex.schema.createTable(this.tableName, table=>{
                table.string('title');
                table.float('price');
                table.string('thumbnail');
                table.timestamp('timeStamp').defaultTo(knex.fn.now())
                table.increments('id').primary();
            })
            console.log(`tabla ${this.tableName} creada`)
        }else{
            console.log(`la tabla productos ya existe`)
        }
        
    }
    getData = async (knex) => {
        let rows = await knex.from(this.tableName).select("*")
        let list = []
        for(const row of rows) {
            list.push({
                title: row["title"],
                price: row["price"],
                thumbnail: row["thumbnail"],
                timeStamp: row["timeStamp"],
                id: row["id"]
            })
        }
        
        return list;
    }
    getDataById = async (knex, id)=>{
        let prod = await knex(this.tableName).select("*").where({id: id})
        return{
                title: prod[0]["title"],
                price: prod[0]["price"],
                thumbnail: prod[0]["thumbnail"],
                timeStamp: prod[0]["timeStamp"],
                id: prod[0]["id"]
        }
    }
    insertData = async (knex, title, price, thumbnail) =>{
        await knex(this.tableName).insert(
            {title: title, price: price, thumbnail: thumbnail}
        )
    }
    updateData = async (knex, id, title, price, thumbnail)=>{
        await knex(this.tableName).where({id: id}).update( {
            title: title,
            price: price,
            thumbnail: thumbnail
        })
    }
    deleteData = async (knex, id) =>{
        await knex(this.tableName).where({id: id}).del()
    }
}

module.exports = ModelProductos