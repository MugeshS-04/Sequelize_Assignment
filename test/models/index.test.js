const sinon = require('sinon')
const db = require ('../../models/index.js')
const { expect } = require('chai')

describe("Index", () => {
    it("should return failed to connect to db", async () => {
        
        sinon.stub(db.sequelize, "authenticate").rejects(new Error("DB down"))

        const logspy = sinon.spy(console, "log")
        
        await db.connectDB()

        expect(logspy.calledOnce).to.be.true
    })
})