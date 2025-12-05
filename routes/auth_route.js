import express from 'express'
import { upload } from '../helper/file_upload.js'
import { celebrate, Joi } from 'celebrate'
import { access_verify, refresh_verify } from '../helper/token.js'
import { register_, login_, delete_, update_, uploadresult_, verifyemail_, isverified_, refreshtoken_} from '../controllers/controller.js'

const auth_router = express.Router()

auth_router.post("/register", celebrate({
    body : Joi.object({
        name : Joi.string().required(),
        age : Joi.number().integer().min(18).required(),
        dept : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(8).required()
    })
}), register_)

auth_router.post("/login", celebrate({
    body : Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
    })
}), isverified_, login_)

auth_router.post("/deletedetails", access_verify, isverified_, delete_)
auth_router.post("/updatedetails", access_verify, isverified_, update_)
auth_router.post("/verify", verifyemail_)

auth_router.post("/uploadresult",  upload, uploadresult_)
auth_router.post("/refresh", refresh_verify, refreshtoken_)

export default auth_router