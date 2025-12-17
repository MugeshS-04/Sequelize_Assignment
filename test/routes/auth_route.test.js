import request from 'supertest'
import sinon from 'sinon'
import { expect } from 'chai'
import app from '../../app.js'
import { student } from '../../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

describe("AUTH ROUTES", () => {

  afterEach(() => sinon.restore())

  it("POST /auth/login → success", async () => {

    sinon.stub(student, "findOne").resolves({
      email: "test@gmail.com",
      password: "hashed",
      verified: true
    })

    sinon.stub(bcrypt, "compare").resolves(true)

    sinon.stub(jwt, "sign").returns("token123")

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Password@123"
        })

    expect(res.status).to.equal(200)

    expect(res.body).to.deep.equal({
      success: true,
      message: "Login successfull!",
      access_token: "token123",
      refresh_token: "token123"
    })
  })
})
