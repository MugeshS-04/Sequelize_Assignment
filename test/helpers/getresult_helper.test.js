const sinon =  require("sinon")
const chai = require('chai')
const { getresult_helper } = require("../../helper/helper.js")
const db = require('../../models/index.js')

const expect = chai.expect

describe("getresult_helper", () => {

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

    await db.student.create(req)
  })

  after( async () => {
    await db.student.destroy({where : {dept : "QWER"}})
  })

  afterEach(() => {
    sinon.restore()
  })

  it("should return the result of the user", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    await getresult_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
      result : "asdsadadasd"
    })
  })

  it("should return result not yet uploaded", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    sinon.stub(db.student, "findOne").resolves({
      result : null
    })

    await getresult_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
      result_status : "Result not updated!"
    })
  })

  it("should return email doesn't exist!", async () => {
  
    const req = {
        user : {
            key : "assdffds@gmail.com"
        }
    }

    const res = {
        json : sinon.stub()
    }
    
    sinon.stub(db.student, "findOne").resolves(null)

    await getresult_helper(req, res)
    
    expect(res.json.calledOnce).to.be.true
    
    expect(res.json.firstCall.args[0]).to.deep.equals({
        success : false, message : "Email doesn't exist!"
    })
    
   })
})