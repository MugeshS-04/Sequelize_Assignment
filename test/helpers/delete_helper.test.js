const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const { student } = require('../../models/index.js')
const { delete_helper } = require('../../helper/helper')

describe("delete_helper", () => {
    afterEach(() => {
        sinon.restore()
    })

    it("should return user deleted successfully!", async () => {
        const req = {
            user : {
                key : "mugesh.s@rently.com"
            },
            body : {
                email : "mugesh.s@rently.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "destroy").resolves(1)

        await delete_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : true, 
            message : `Deleted successfully!`
        })
    })

    it("should return no user deleted", async () => {
        const req = {
            user : {
                key : "mugesh.s@rently.com"
            },
            body : {
                email : "mugesh.s@rently.com"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(student, "destroy").resolves(0)

        await delete_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "No records deleted!"
        })
    })
})