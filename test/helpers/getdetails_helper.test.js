const sinon =  require("sinon")
const chai = require('chai')
const { getdetails_helper } = require("../../helper/helper.js")
const { student } = require('../../models/index.js')

const expect = chai.expect

describe("getdetails_helper", () => {

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

  it("should return the details of the user when record exists", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    await getdetails_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
      name : "ABCD", 
      roll_no : 999,
      age : 21,
      dept : "QWER", 
      email : "assdffds@gmail.com"
    })
  })

  it("should return error message when no record found", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
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