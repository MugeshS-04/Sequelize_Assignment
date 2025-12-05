const { sequelize } = require('../models/db.js')
const { DataTypes } = require('sequelize')
const studentModel = require("../models/student.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const student = studentModel(sequelize, DataTypes)

const register_helper = async (req, res) => {

    const { name, age, dept, email, password } = req.body

    const existing = await student.findOne({ where : {email : email}})

    if(existing)
    {
        return res.json({ success : false, message : "The Email already exists!" })
    }
    else
    {
        const hashpass = await bcrypt.hash(password, 10)
        await student.create({ name : name, age : age, dept : dept, email : email, password : hashpass })
        return res.json({success : true, message : "Registration Successfull!, Verfiy your account to receive roll number" })

    }
}

const login_helper = async (req, res) => {

    const { email, password } = req.body

    const existing = await student.findOne({ where : {email : email}})

    if(existing)
    {
        const isvalid = await bcrypt.compare(password, existing.password)
        if(isvalid)
        {
            const access_token  = jwt.sign({ key : email}, process.env.JWT_ACCESS_SECRETKEY, {expiresIn : '1d'})
            const refresh_token = jwt.sign({ key : email}, process.env.JWT_REFRESH_SECRETKEY, {expiresIn : '5d'})

            return res.json({ success : true, message : "Login successfull!", access_token : access_token, refresh_token : refresh_token })
        }
        else
        {
            return res.json({ success : false, message : "Password is incorrect!" })
        }
    }
    else
    {
        return res.json({ success : false, message : "Given email doesn't exist!"})
    }
}

const getdetails_helper = async (req, res) => {

    const key = req.user.key
        
    const record = await student.findOne({ where : {email : key}, raw : true})
    
    if(record)
    {
        return res.json({ name : record.name, roll_no : record.roll_no, age : record.age, dept : record.dept, email : record.email })
    }
    else
    {
        return res.json({success : false, message : "No Data found!" })
    }

}

const update_helper = async (req, res) => {

    const key = req?.user?.key

    const email = req?.body?.email || key

    const { name, age, dept } = req.body

    const upd = await student.update({ name : name ,age : age, dept: dept, email : email }, { where : {email : email} })

    if(upd > 0)
    {
        return res.json({success : true, message : `Updated successfully!`})
    }
    else
    {
        return res.json({success : false, message : "No entires updated"})
    }
}

const delete_helper = async (req, res) => {

    const key = req?.user?.key

    const email = req?.body?.email || key

    const del = await student.destroy({where : {email : email}})
    
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

    const { email, password } = req.body

    const result = await student.findOne({where : {email : email}})

    if(result)
    {
        const isvalid = await bcrypt.compare(password, result.password)

        if(isvalid)
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
            return res.json({success : false, message : "The password is incorrect"})
        }
    }
    else
    {
        return res.json({success : false, message : "Email doesn't exist!"})
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

const deptresult_helper = async (req, res) => {
    
    const { dept } = req.body

    const result = await student.findAll({where : {dept : dept}})

    const arr = []

    result.forEach(row => {
        arr.push({
            roll_no: row.roll_no,
            name : row.name,
            dept : row.dept,
            result: row.result
        })
    })

    res.json(arr)
}

const deptcount_helper = async (req, res) => {
    
    const { dept } = req.body

    const result = await student.count({where : {dept : dept}})

    res.json({ student_count : result})
}

const verifyemail_helper = async (req, res) => {

    const { email } = req.body

    const result = await student.findOne({where : {email : email}})

    if(result)
    {
        const verifystudent = await student.update({verified : true}, {where : {email : email}})
        return res.json({roll_no : result.roll_no, success : true, message: "Verified Successfully!"})
    }
    else
    {
        return res.json({success : false, message : "The given email doesn't exist!"})
    }
}

const isverified_helper = async (req, res, next) => {

    const key = req?.user?.key

    console.log("key => " + key)
    console.log("email => "+ req?.body?.email)

    const email = req?.body?.email || key

    const result = await student.findOne({where : {email : email}})

    if(result?.verified)
    {
        next()
    }
    else
    {
        return res.json({success : false, message : "The given email is not verified!"})
    }
}

const refreshtoken_helper = async (req, res) => {

    try{
        const header = req.headers["authorization"]

        const token = header.split(" ")[1]

        const isvalid = jwt.verify(token, process.env.JWT_REFRESH_SECRETKEY)

        const access_token = jwt.sign({key : isvalid.email}, process.env.JWT_ACCESS_SECRETKEY, {expiresIn : "1d"})

        return res.json({success : true, message : "Refresh token verified successfully!", access_token : access_token})
    } 
    catch(error)
    {
        return res.json({success : false, message : "Error in received token!"})
    }  
}

module.exports = {
    register_helper,
    login_helper,
    getdetails_helper,
    delete_helper,
    update_helper,
    getresult_helper,
    uploadresult_helper,
    deptresult_helper,
    deptcount_helper,
    verifyemail_helper,
    isverified_helper,
    refreshtoken_helper
}
