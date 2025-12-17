const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const { student } = require('../../models/index.js')
const { deptresult_helper } = require('../../helper/helper')

describe("uploadresult_helper", async() => {

    before( async () => {

        const req = {
            roll_no : 999,
            name : "ABCD", 
            age : 21,
            dept : "QWER", 
            email : "assdffds@gmail.com", 
            password : "121323wqeq",
            result : "asdsadadasd"
        }

        await student.create(req)
    })

    after( async () => {
        await student.destroy({where : {dept : "QWER"}})
    })

    afterEach(() => {
        sinon.restore()
    })

    it("should return dept result", async () => {
        
        const req = {
            body: {
                dept : "QWER"
            }
        }

        const res = {
            json : sinon.stub()
        }

        await deptresult_helper(req, res)

        expect(res.json.firstCall.args[0]).to.deep.equal([
            {
            roll_no : 999,
            name : "ABCD", 
            dept : "QWER",  
            result : "asdsadadasd"
            }
        ])
    })
})