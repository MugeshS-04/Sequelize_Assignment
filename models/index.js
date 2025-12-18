const fs = require('fs');
const path = require('path');
const { Sequelize } = require("sequelize")

const basename = path.basename(__filename)

const config = require('../config/config.cjs')

const db = {}

const sequelize = new Sequelize(config.development)

fs.readdirSync(__dirname).filter(file => {
  if(
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ) return file

}).forEach(file => {

  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;

})

const connectDB = async () => {
  try{
    await sequelize.authenticate()
    console.log("DB Connected successfully!")
  }
  catch(error)
  {
    console.log("Failed to connect to DB")
  }
}

db.sequelize = sequelize
db.connectDB = connectDB

Object.keys(db).forEach(modelName => {
  if(db[modelName].associate)
  {
    db[modelName].associate(db)
  }
})

module.exports = db
