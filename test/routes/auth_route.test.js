import request from 'supertest'
import sinon from 'sinon'
import { expect } from 'chai'
import app from '../../app.js'
import db from '../../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

describe("AUTH ROUTES", () => {

  before( async () => {
  
    const req = {
      roll_no : 999,
      name : "ABCD", 
      age : 21,
      dept : "QWER", 
      email : "assdffds@gmail.com",
      password : "121323wqeq",
      result : "asdsadadasd",
      verified : true
    }

    await db.student.create(req)

  })

  after( async () => {
      await db.student.destroy({where : {dept : "QWER"}})
  })

  afterEach(() => { 
    sinon.restore() 
  })

  it("register api → registeration successfull", async () => {

    sinon.stub(db.student, "findOne").resolves(null)

    sinon.stub(bcrypt, "hash").resolves("12weqwee21e2e2qsqw")

    sinon.stub(db.student, "create").resolves(true)

    const res = await request(app).post("/auth/register").send({
      name: "ABCD",
      age: 21,
      dept: "QWER",
      email: "assdffds@gmail.com",
      password: "121323wqeq"
    })

    expect(res.status).to.be.equal(200)

    expect(res.body).to.deep.equal({
      success : true, 
      message: "Account registered Sucessfully, Verification Email is being sent!"
    })
  })

  it("register api → Email id already exist", async () => {

    sinon.stub(db.student, "findOne").resolves({})

    const res = await request(app).post("/auth/register").send({
      name: "ABCD",
      age: 21,
      dept: "QWER",
      email: "assdffds@gmail.com",
      password: "121323wqeq"
    })

    expect(res.status).to.be.equal(200)

    expect(res.body).to.deep.equal({
      success : false, 
      message : "The Email already exists!"
    })
  })

  it("login api → login successfull", async () => {

    sinon.stub(bcrypt, "compare").resolves(true)

    sinon.stub(jwt, "sign").returns("token123")

    const res = await request(app)
    .post("/auth/login")
    .send({
      email : "assdffds@gmail.com",
      password : "121323wqeq",
    })

    expect(res.status).to.be.equal(200)

    expect(res.body).to.deep.equal({
      success: true,
      message: "Login successfull!",
      access_token: "token123",
      refresh_token: "token123"
    })
  })

  it("login api → Password Mismatch", async () => {

    sinon.stub(bcrypt, "compare").resolves(false)

    const res = await request(app)
    .post("/auth/login")
    .send({
      email : "assdffds@gmail.com",
      password : "12132",
    })

    expect(res.body).to.deep.equal({
      success : false, 
      message : "Password is incorrect!"
    })
  })

  it("updatedetails api -> Details updation successfull", async () => {
    
    sinon.stub(jwt, "verify").returns({key : "assdffds@gmail.com"})

    const res = await request(app).post("/auth/updatedetails").set("authorization", "Bearer 12312312321").send({
      name: "ABCD",
      age: 21,
      dept: "QWER"
    })

    expect(res.body).to.deep.equals({
      success : true, 
      message : `Updated successfully!`
    })
    
  })

  it("updatedetails api -> Details updation unsuccessfull", async () => {
    
    sinon.stub(jwt, "verify").returns({key : "assdffds11@gmail.com"})

    sinon.stub(db.student, "findOne").resolves({verified: true})

    const res = await request(app).post("/auth/updatedetails").set("authorization", "Bearer 12312312321").send({
      name: "ABCD",
      age: 21,
      dept: "QWER"
    })

    expect(res.body).to.deep.equals({
      success : false, 
      message : "No entires updated"
    })
    
  })

  it("deletedetails api → deletion successfull!", async () => {

      sinon.stub(jwt, "verify").returns({key : "assdffds@gmail.com"})

      const res = await request(app).post("/auth/deletedetails").set("authorization", "Bearer 12312312321")

      expect(res.body).to.deep.equals({
        success : true, 
        message : `Deleted successfully!`
      })
  })

  it("deletedetails api → deletion unsuccessfull!", async () => {

      sinon.stub(jwt, "verify").returns({key : "assdffds@gmail.com"})

      sinon.stub(db.student, "findOne").resolves({verified: true})

      const res = await request(app).post("/auth/deletedetails").set("authorization", "Bearer 12312312321")

      expect(res.body).to.deep.equals({
        success : false, 
        message : `No records deleted!`
      })
  })
  
})