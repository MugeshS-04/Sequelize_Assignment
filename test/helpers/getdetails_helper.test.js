const sinon =  require("sinon")
const chai = require('chai')
const { getdetails_helper } = require("../../helper/helper.js")
const { student } = require('../../models/index.js')

const expect = chai.expect

describe("getdetails_helper", () => {

  afterEach(() => {
    sinon.restore()
  })

  it("should return the details of the user when record exists", async () => {

    const req = {
      user: {
        key: "mugesh.s@rently.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    sinon.stub(student, "findOne").resolves({
      name: "Mugesh",
      roll_no: "21CS001",
      age: 21,
      dept: "CSE",
      email: "test@gmail.com"
    })

    await getdetails_helper(req, res)

    expect(res.json.calledOnce).to.be.true
    expect(res.json.firstCall.args[0]).to.deep.equal({
      name: "Mugesh",
      roll_no: "21CS001",
      age: 21,
      dept: "CSE",
      email: "test@gmail.com"
    })
  })

  it("should return error message when no record found", async () => {

    const req = {
      user: {
        key: "unknown@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    sinon.stub(student, "findOne").resolves(null)

    await getdetails_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
      success: false,
      message: "No Data found!"
    })
  })
})