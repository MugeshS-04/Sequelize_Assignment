import request from "supertest"
import { expect } from 'chai'
import sinon from "sinon"
import db from "../../models/index.js"
import jwt from 'jsonwebtoken'
import app from "../../app.js"

describe("USER ROUTES", () => {
    
    before( async () => {
      
        const req = {
            roll_no : 999,
            name : "ABCD", 
            age : 21,
            dept : "QWER", 
            email : "assdffds@gmail.com",
            password : "121323wqeq",
            result : "asdsadadasd",
            verified: true,
        }

        await db.student.create(req)
    })

    beforeEach(() => {
        sinon.stub(jwt, "verify").returns({key : "assdffds@gmail.com"})
    })

    after( async () => {
        await db.student.destroy({where : {dept : "QWER"}})
    })

    afterEach(() => { 
        sinon.restore() 
    })

    it("getresult api -> Got results", async () => {

        const res = await request(app).get("/user/getresult").set("authorization", "Bearer 12312312321")

        expect(res.body).to.deep.equals({
            result : "asdsadadasd",
        })
    })

    it("getresult api -> results not uploaded", async () => {

        sinon.stub(db.student, "findOne").resolves({result : null})

        const res = await request(app).get("/user/getresult").set("authorization", "Bearer 12312312321")

        expect(res.body).to.deep.equals({
            result_status : "Result not updated!"
        })
    })

    it("getdetails api -> details returned successfully", async () => {

        const res = await request(app).get("/user/getdetails").set("authorization", "Bearer 12312312321")

        expect(res.body).to.deep.equals({
            name : "ABCD", 
            roll_no : 999, 
            age : 21, 
            dept : "QWER", 
            email : "assdffds@gmail.com"
        })
    })

    it("getdetails api -> details not found", async () => {

        sinon.stub(db.student, "findOne").onSecondCall().resolves(null)

        const res = await request(app).get("/user/getdetails").set("authorization", "Bearer 12312312321").send({
            email : "assdffds@gmail.com"
        })

        expect(res.body).to.deep.equals({
            success : false, 
            message : "The given email is not verified!" 
        })
    })

})