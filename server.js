import express from 'express'
import { connectDB } from './db.js'
import { student } from './userModel.js'

await connectDB()

const email = "mugesh.s@rently.com"

//Data insertion
const existing = await student.findOne({ where : {email : email}})
if(existing)
{
    console.log("The Email already exists!")
}
else
{
    await student.create({name : "Mugesh S", age : 21, email : "mugesh.s@rently.com"})
    console.log("Data inserted Successfully!")
}

//find
const result = await student.findAll({raw : true})
console.log(result)

//delete
// const del = await student.destroy({where : {email : email}})
// console.log(del)

//update
const upd = await student.update({ name : "Mugesh", age : 22 }, { where : {email : "mugesh.s@rently.com"} })
console.log(upd)

