const sinon =  require("sinon")
const chai = require('chai')

const { isverified_helper } = require("../../helper/helper.js")
const db = require('../../models/index.js')

const expect = chai.expect

describe("isverified_helper", () => {

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

  it("should return the user is verified", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    const next = sinon.stub()

    await isverified_helper(req, res, next)

    expect(next.calledOnce).to.be.true
  })

  it("should return the user is not verified", async () => {

    const req = {
      user: {
        key: "assdffds@gmail.com"
      },
      body: {
        email: "assdffds@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    const next = sinon.stub()

    sinon.stub(db.student, "findOne").resolves({
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