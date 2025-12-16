import sinon from "sinon"
import { expect } from "chai"
import nodemailer from "nodemailer"

describe("mail transporter", () => {

  afterEach(() => {
    sinon.restore()
  })

  it("should create nodemailer transporter with gmail config", async () => {

    const fakeTransporter = {
      sendMail: sinon.stub()
    }

    const createTransportStub = sinon.stub(nodemailer, "createTransport").returns(fakeTransporter)

    const { transporter } = await import("../../helper/mail.js")

    expect(createTransportStub.calledOnce).to.be.true

    expect(createTransportStub.firstCall.args[0]).to.deep.equal({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
      }
    })

    expect(transporter).to.equal(fakeTransporter)
  })
})
