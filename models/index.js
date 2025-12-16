const { DataTypes } = require("sequelize")
const { sequelize } = require("./db")

const studentModel = require("./student")

const student = studentModel(sequelize, DataTypes)

module.exports = {
  sequelize,
  student
}
