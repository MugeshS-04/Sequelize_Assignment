const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const { student } = require('../../models/index.js')
const { uploadresult_helper, verifyemail_helper } = require('../../helper/helper')

describe("verifyemail_helper", async() => {

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

        await student.create(req)
    })

    after( async () => {
        await student.destroy({where : {dept : "QWER"}})
    })

    afterEach(() => {
        sinon.restore()
    })

    it("should return the email verified successfully!", async () => {
        
        const req = {
            params: {
                email : "assdffds@gmail.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        await verifyemail_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            roll_no : 999, 
            success : true, 
            message: "Verified Successfully!"
        })
    })

    it("should return email verification unsuccessfull", async () => {
        
        const req = {
            params: {
                email : "assdffds@gmail.com"
            }
        }
        
        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "findOne").resolves(null)

        await verifyemail_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "The given email doesn't exist!"})
    })
})