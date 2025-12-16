const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

const { student } = require('../../models/index.js')
const { deptcount_helper } = require('../../helper/helper')


describe("department count", () => {

    afterEach(() => sinon.restore())

    it("should return the count of the given department", async () => {
        const req = {
            body : {
                dept : "QWE"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "count").resolves(2)
        
        await deptcount_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            student_count : 2
        })
    })

    it("should return department doesn't exist", async () => {
        const req = {
            body : {
                dept : "CSE"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "count").resolves(null)
        
        await deptcount_helper(req, res)

        expect(res.json.calledOnce).to.be.true
        
        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false,
            message : "Given department doesn't exist!"
        })
    })
})