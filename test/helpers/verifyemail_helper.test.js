const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const { student } = require('../../models/index.js')
const { uploadresult_helper, verifyemail_helper } = require('../../helper/helper')

describe("verifyemail_helper", async() => {

    afterEach(() => {
        sinon.restore()
    })

    it("should return the email verified successfully!", async () => {
        
        const req = {
            params: {
                email : "mugesh.s@rently.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "findOne").resolves({roll_no : 1, email : "mugesh.s@rently.com"})

        sinon.stub(student, "update").resolves([1])

        await verifyemail_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            roll_no : 1, 
            success : true, 
            message: "Verified Successfully!"
        })
    })

    it("should return email verification unsuccessfull", async () => {
        
        const req = {
            params: {
                email : "mugesh.s@rently.com"
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