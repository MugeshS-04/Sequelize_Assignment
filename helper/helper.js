const { sequelize } = require('./db.js')
const { DataTypes } = require('sequelize')
const studentModel = require("../models/student.js")

const student = studentModel(sequelize, DataTypes)

const create_helper = async (req, res) => {

    const { name, email, age } = req.body

    const existing = await student.findOne({ where : {email : email}})

    if(existing)
    {
        return res.json({ success : false, message : "The Email already exists!" })
    }
    else
    {
        await student.create({name : name, age : age, email : email})
        return res.json({success : true, message : "Data inserted Successfully!" })
    }
}

const read_helper = async (req, res) => {

    const { email } = req.body

    const record = await student.findAll({ where : {email : email}, raw : true})

    if(record)
    {
        return res.json(record)
    }
    else
    {
        return res.json({success : false, message : "No Data found!" })
    }
}

const update_helper = async (req, res) => {

    const { email, name, age } = req.body

    const upd = await student.update({ name : name , age : age }, { where : {email : email} })

    if(upd > 0)
    {
        return res.json({success : true, message : `Updated ${upd} no of rows successfully!` })
    }
    else
    {
        return res.json({success : false, message : "No entires updated"})
    }
}

const delete_helper = async (req, res) => {

    const { email } = req.body

    const del = await student.destroy({where : {email : email}})
    
    if(del > 0) 
    {   
        res.json({success : true, message : `Deleted ${del} number of records successfully!`})
    }
    else 
    {
        res.json({success : true, message : "No records deleted!"})
    }
}

module.exports = {
    create_helper,
    read_helper,
    delete_helper,
    update_helper
}
