const sinon =  require("sinon")
const chai = require('chai')
const { getresult_helper } = require("../../helper/helper.js")
const { student } = require('../../models/index.js')

const expect = chai.expect

describe("getresult_helper", () => {

  afterEach(() => {
    sinon.restore()
  })

  it("should return the result of the user", async () => {

    const req = {
      user: {
        key: "mugesh.s@rently.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    sinon.stub(student, "findOne").resolves({
      result : "asdsdasda.sdsadad"
    })

    await getresult_helper(req, res)

    expect(res.json.calledOnce).to.be.true

    expect(res.json.firstCall.args[0]).to.deep.equal({
      result : "asdsdasda.sdsadad"
    })
  })

  it("should return result not yet uploaded", async () => {

    const req = {
      user: {
        key: "unknown@gmail.com"
      }
    }

    const res = {
      json: sinon.stub()
    }

    sinon.stub(student, "findOne").resolves({
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
            key : "mugesh.s@rently.com"
        },
        body : {
            email : "mugesh.s@rently.com",
        }
    }

    const res = {
        json : sinon.stub()
    }
    
    sinon.stub(student, "findOne").resolves(null)

    await getresult_helper(req, res)
    
    expect(res.json.calledOnce).to.be.true
    
    expect(res.json.firstCall.args[0]).to.deep.equals({
        success : false, message : "Email doesn't exist!"
    })
   })
})