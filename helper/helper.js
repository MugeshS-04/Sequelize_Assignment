const { sequelize } = require('../models/db.js')
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
        await student.create({ name : name, age : age, email : email })
        const stud = await student.findOne({where : {email : email}})
        return res.json({roll_no : stud.roll_no, success : true, message : "Data inserted Successfully!" })
    }
}

const read_helper = async (req, res) => {

    const { roll_no } = req.body

    const record = await student.findOne({ where : {roll_no : roll_no}, raw : true})

    if(record)
    {
        return res.json({ name : record.name, age : record.age, email : record.email })
    }
    else
    {
        return res.json({success : false, message : "No Data found!" })
    }
}

const update_helper = async (req, res) => {

    const { roll_no, name, email, age } = req.body

    const upd = await student.update({ name : name ,age : age, email : email }, { where : {roll_no : roll_no} })

    if(upd > 0)
    {
        return res.json({success : true, message : `Updated successfully!` })
    }
    else
    {
        return res.json({success : false, message : "No entires updated"})
    }
}

const delete_helper = async (req, res) => {

    const { roll_no } = req.body

    const del = await student.destroy({where : {roll_no : roll_no}})
    
    if(del > 0) 
    {   
        res.json({success : true, message : `Deleted successfully!`})
    }
    else 
    {
        res.json({success : true, message : "No records deleted!"})
    }
}

const getresult_helper = async (req, res) => {
    
    const { roll_no } = req.body

    const result = await student.findOne({where : {roll_no : roll_no}})

    if(result)
    {
        if(result.result)
        {
            return res.json({result : result.result})
        }
        else
        {
            return res.json({result_status : "Result not updated!"})
        }
    }
    else
    {
        return res.json({success : false, message : "Roll Number doesn't exist!"})
    }
}

const uploadresult_helper = async (req, res) => {
    
    const { roll_no } = req.body

    const rollno = Number(roll_no)

    const result = await student.findOne({where : {roll_no : rollno}})

    if(result)
    {
        const upload = await student.update({result : req.body.path},{where : {roll_no : rollno}})
        return res.json({success : true, message : "Result Updated Successfully!"})
    }
    else
    {
        return res.json({success : false, message : "Roll Number doesn't exist!"})
    }
}

module.exports = {
    create_helper,
    read_helper,
    delete_helper,
    update_helper,
    getresult_helper,
    uploadresult_helper
}
