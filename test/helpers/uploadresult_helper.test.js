const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const db = require('../../models/index.js')
const { uploadresult_helper } = require('../../helper/helper')

describe("uploadresult_helper", async() => {

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

    it("should return result updation successfull!", async () => {
        
        const req = {
            body: {
                roll_no : 999,
                path : "1221qweweqwe"
            }  
        }

        const res = {
            json : sinon.stub()
        }

        await uploadresult_helper(req, res)

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : true, 
            message : "Result Updated Successfully!"
        })
    })

    it("should return result updation unsuccessfull", async () => {
        
        const req = {
            body: {
                roll_no : 999,
                path : "1221qweweqwe"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(db.student, "findOne").resolves(null)

        await uploadresult_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "Roll Number doesn't exist!"
        })
    })
})