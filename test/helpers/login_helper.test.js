const sinon = require('sinon')
const db = require('../../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { login_helper } = require('../../helper/helper')
const { expect } = require('chai')

describe("login_helper", () => {

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

    afterEach(() => sinon.restore())

    it("should return login successfull!", async () => {

        const req = {
            body : {
                email : "assdffds@gmail.com",
                password : "121323wqeq",
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(bcrypt, "compare").resolves(true)

        sinon.stub(jwt, "sign").returns("qwrty1234wer1234")

        await login_helper(req, res)
        
        expect(res.json.calledOnce).to.be.true
        
        expect(res.json.firstCall.args[0]).to.deep.equals({
            success : true, 
            message : "Login successfull!", 
            access_token : "qwrty1234wer1234", 
            refresh_token : "qwrty1234wer1234"
        })
    })

    it("should return password is incorrect!", async () => {

        const req = {
            body : {
                email : "assdffds@gmail.com",
                password : "fake",
            }
        }

        const res = {
            json : sinon.stub()
        }

        await login_helper(req, res)
        
        expect(res.json.calledOnce).to.be.true
        
        expect(res.json.firstCall.args[0]).to.deep.equals({
            success : false, 
            message : "Password is incorrect!"
        })
    })

    it("should return email doesn't exist!", async () => {

        const req = {
            body : {
                email : "assdffds@gmail.com",
                password : "fake",
            }
        }

        const res = {
            json : sinon.stub()
        }
        
        sinon.stub(db.student, "findOne").resolves(null)

        await login_helper(req, res)
        
        expect(res.json.calledOnce).to.be.true
        
        expect(res.json.firstCall.args[0]).to.deep.equals({
            success : false, 
            message : "Given email doesn't exist!"
        })
    })
})