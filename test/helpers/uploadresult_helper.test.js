const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const { student } = require('../../models/index.js')
const { uploadresult_helper } = require('../../helper/helper')

describe("uploadresult_helper", async() => {

    afterEach(() => {
        sinon.restore()
    })

    it("should return result updation successfull!", async () => {
        
        const req = {
            body: {
                rollno : 1
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "findOne").resolves({rollno : 1})

        sinon.stub(student, "update").resolves(true)

        await uploadresult_helper(req, res)

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : true, 
            message : "Result Updated Successfully!"
        })
    })

    it("should return result updation unsuccessfull", async () => {
        
        const req = {
            body: {
                rollno : 1
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "findOne").resolves(null)

        await uploadresult_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "Roll Number doesn't exist!"
        })
    })
})