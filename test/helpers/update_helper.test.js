const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

const { student } = require('../../models/index.js')
const { update_helper } = require('../../helper/helper.js')

describe("update_helper", () => {
  afterEach(() => {
    sinon.restore()
  })
  
  it("should return updated successfully!", async () => {

    const req = {
        user : {
            key : "mugesh.s@rently.com"
        },
        body : {
            name : "mugesh",
            email : "mugesh.s@rently.com",
            age : 21,
            dept : "CSE",
            email : "mugesh.s@rently.com"
        }
    }

    const res = {
        json : sinon.stub()
    }

    sinon.stub(student, "update").resolves(1)

    await update_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
        success : true, 
        message : `Updated successfully!`
    })

  })

  it("should return update not successfull!", async () => {

    const req = {
        user : {
            key : "mugesh.s@rently.com"
        },
        body : {
            name : "mugesh",
            email : "mugesh.s@rently.com",
            age : 21,
            dept : "CSE",
            email : "mugesh.s@rently.com"
        }
    }

    const res = {
        json : sinon.stub()
    }

    sinon.stub(student, "update").resolves(0)

    await update_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
        success : false, 
        message : "No entires updated"
    })
  })
})