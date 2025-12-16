const sinon =  require("sinon")
const chai = require('chai')

const { isverified_helper } = require("../../helper/helper.js")
const { student } = require('../../models/index.js')

const expect = chai.expect

describe("isverified_helper", () => {

  afterEach(() => {
    sinon.restore()
  })

  it("should return the user is verified", async () => {

    const req = {
      user: {
        key: "mugesh.s@rently.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    const next = sinon.stub()

    sinon.stub(student, "findOne").resolves({
      email : "mugesh.s@rently.com",
      verified : true
    })

    await isverified_helper(req, res, next)

    expect(next.calledOnce).to.be.true
  })

  it("should return the user is not verified", async () => {

    const req = {
      user: {
        key: "mugesh.s@rently.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    const next = sinon.stub()

    sinon.stub(student, "findOne").resolves({
      email : "mugesh.s@rently.com",
      verified : false
    })

    await isverified_helper(req, res, next)

    expect(res.json.calledOnce).to.be.true
    
    expect(next.calledOnce).to.be.false

    expect(res.json.firstCall.args[0]).to.deep.equal({
        success : false, 
        message : "The given email is not verified!"
    })
  })
  
})