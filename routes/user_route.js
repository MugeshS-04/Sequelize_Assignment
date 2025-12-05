import express from 'express'
import { access_verify } from '../helper/token.js'
import { isverified_, getdetails_, getresult_, deptcount_, deptresult_ } from '../controllers/controller.js'

const user_router = express.Router()

user_router.get("/getdetails", access_verify, isverified_, getdetails_)
user_router.get("/getresult", access_verify, getresult_)

user_router.get("/getdeptresult", access_verify, deptresult_)
user_router.get("/getdeptcount", access_verify, deptcount_)

export default user_router