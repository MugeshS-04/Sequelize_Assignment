import { DataTypes } from "sequelize";
import { sequelize } from "../helper/db.js";

export const student = sequelize.define('student', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    age : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    email : {
        type : DataTypes.TEXT,
        allowNull : false,
        unique : true
    }
})