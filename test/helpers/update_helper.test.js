const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

const db = require('../../models/index.js')
const { update_helper } = require('../../helper/helper.js')

describe("update_helper", () => {

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
  
  it("should return updated successfully!", async () => {

    const req = {
        user : {
            key : "assdffds@gmail.com"
        },
        body : {
            name : "ABCDEFG", 
            age : 21,
            dept : "QWER", 
            email : "assdffds@gmail.com"
        }
    }

    const res = {
        json : sinon.stub()
    }

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
          key : "assdffds@gmail.com"
      },
      body : {
          name : "ABCDEFG", 
          age : 21,
          dept : "QWER", 
          email : "assdffds@gmail.com"
      }
    }

    const res = {
      json : sinon.stub()
    }

    sinon.stub(db.student, "update").resolves(0)

    await update_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
        success : false, 
        message : "No entires updated"
    })
  })
})