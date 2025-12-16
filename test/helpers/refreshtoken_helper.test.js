const sinon = require('sinon')
const chai = require('chai')
const jwt = require('jsonwebtoken')

const expect = chai.expect
const { refreshtoken_helper } = require('../../helper/helper')

describe("refreshtoken_helper", async() => {

    afterEach(() => {
        sinon.restore()
    })

    it("should return the refresh token generation successfull!", async () => {
        
        const req = {
            headers : {
                authorization : "accesstoken 11231231212143"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(jwt, "verify").resolves({
            email: "mugesh.s@rently.com"
        })

        sinon.stub(jwt, "sign").returns("access_token")

        await refreshtoken_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : true, 
            message : "Refresh token verified successfully!", 
            access_token : "access_token"
        })
    })

    it("should return the refresh token generation unsuccessfull!", async () => {
        
        const req = {
            headers : {
                authorization : "accesstoken 11231231212143"
            }
        }

        const res = {
            json : sinon.stub()
        }

        sinon.stub(jwt, "verify").throws(new Error("asadasda"))

        await refreshtoken_helper(req, res)

        expect(res.json.calledOnce).to.be.true

        expect(res.json.firstCall.args[0]).to.deep.equal({
            success : false, 
            message : "Error in received token!"
        })
    })
})