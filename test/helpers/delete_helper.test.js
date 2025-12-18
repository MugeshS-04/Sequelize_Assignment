const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const db = require('../../models/index.js')
const { delete_helper } = require('../../helper/helper')

describe("delete_helper", () => {
    
    before( async () => {

        const req = {
            name : "ABCD", 
            age : 21,
            dept : "CSE", 
            email : "assdffds@gmail.com", 
            password : "121323wqeq"
        }

        await db.student.create(req)
    })

    afterEach(() => {
        sinon.restore()
    })

    it("should return no user deleted", async () => {
        
        const req = {
            user : {
                key : "assdffds@gmail.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(db.student, "destroy").resolves(0)

        await delete_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "No records deleted!"
        })
    })

    it("should return user deleted successfully!", async () => {

        const req = {
            user : {
                key : "assdffds@gmail.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        await delete_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : true, 
            message : `Deleted successfully!`
        })
    })

})