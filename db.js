import dotenv from 'dotenv'
import { Sequelize } from 'sequelize';

dotenv.config()

export const sequelize = new Sequelize({
    database : process.env.database,
    username : process.env.user,
    password : process.env.password,
    dialect: "postgres",
    host : process.env.host,
    port : process.env.port,
})

export const connectDB = async () => {

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



