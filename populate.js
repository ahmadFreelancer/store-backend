const ConnectMongo = require("./db/db")
const productsModel = require("./models/productsModel")
const productsJSON = require("./products.json")

const populate = async () =>{
    try {
        await ConnectMongo();
        await productsModel.deleteMany();
        console.log("Deleted")
        await productsModel.create(productsJSON);
        console.log("Added Successfully!!!")
        process.exit(1);
    } catch (error) {
        console.log("Error")
        console.log(error)
    }
}

populate()