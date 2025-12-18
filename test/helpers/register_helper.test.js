const sinon = require('sinon')
const chai = require('chai')
const bcrypt = require('bcrypt')

const expect = chai.expect
const db = require('../../models/index.js')
const { register_helper } = require('../../helper/helper')

describe("register_helper", async() => {

    after( async () => {
        await db.student.destroy({where : {dept : "QWER"}})
    })

    afterEach(() => {
        sinon.restore()
    })

    it("should return success message as registration successfull!", async () => {
        
        const req = {
            body: {
                name : "ABCD", 
                age : 21,
                dept : "QWER", 
                email : "assdffds@gmail.com",
                password : "121323wqeq",
            }
        }

        const res = {
            json : sinon.stub()
        }

        const next = sinon.stub()

        sinon.stub(bcrypt, "hash").resolves("HashPass")

        await register_helper(req, res, next)

        expect(next.calledOnce).to.be.true
    })

    it("should return email already exist!", async () => {
        
        const req = {
            body: {
                name : "ABCD", 
                age : 21,
                dept : "QWER", 
                email : "assdffds@gmail.com",
                password : "121323wqeq",
            }
        }

        const res = {
            json : sinon.stub()
        }

        const next = sinon.stub()

        await register_helper(req, res, next)

        expect(res.json.calledOnce).to.be.true

        expect(next.called).to.be.false

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success: false,
            message: "The Email already exists!"
        })
    })
})