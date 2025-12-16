const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
const { student } = require('../../models/index.js')
const { deptresult_helper } = require('../../helper/helper')

describe("uploadresult_helper", async() => {

    afterEach(() => {
        sinon.restore()
    })

    it("should return dept result", async () => {
        
        const req = {
            body: {
                dept : "CSE"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "findAll").resolves([{roll_no : 1, name : "mugesh", dept : "CSE", result : "asdsfa.txt"}])

        await deptresult_helper(req, res)

        expect(res.json.firstCall.args[0]).to.deep.equal([
            {roll_no : 1, name : "mugesh", dept : "CSE", result : "asdsfa.txt"}
        ])
    })
})