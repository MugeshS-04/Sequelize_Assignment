const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

const { student } = require('../../models/index.js')
const { deptcount_helper } = require('../../helper/helper')


describe("department count", () => {

    before( async () => {

        const req = {
            name : "ABCD", 
            age : 21,
            dept : "QWER", 
            email : "assdffds@gmail.com", 
            password : "121323wqeq"
        }

        await student.create(req)
    })

    after( async () => {
        await student.destroy({where : {dept : "QWER"}})
    })

    afterEach(() => sinon.restore())

    it("should return the count of the given department", async () => {
        
        const req = {
            body : {
                dept : "QWER"
            }
        }

        const res = {
            json : sinon.stub()
        }
        
        await deptcount_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            student_count : 1
        })
        
    })

    it("should return department doesn't exist", async () => {
        
        const req = {
            body : {
                dept : "QWER"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "count").resolves(0)
        
        await deptcount_helper(req, res)

        expect(res.json.calledOnce).to.be.true
        
        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false,
            message : "Given department doesn't exist!"
        })
    })
})