const dotenv = require('dotenv')
const { Sequelize } = require('sequelize');

dotenv.config()

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host    : process.env.DB_HOST,
    dialect : process.env.DB_DIALECT,
    port    : process.env.DB_PORT
})

const connectDB = async () => {

    try{
        await sequelize.authenticate()
        await sequelize.sync()

        console.log("DB Connected successfully!")
    }
    catch(error)
    {
        console.log("Failed to connect to DB")
    }
}

module.exports = {
    sequelize,
    connectDB
}





