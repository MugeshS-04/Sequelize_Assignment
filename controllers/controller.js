import { register_helper, login_helper, update_helper, getdetails_helper, delete_helper, getresult_helper, uploadresult_helper, deptresult_helper, deptcount_helper, verifyemail_helper, isverified_helper, refreshtoken_helper } from "../helper/helper.js"

export const register_ = (req, res) => {
    return register_helper(req, res)
}

export const login_ = (req, res) => {
    return login_helper(req, res)
}

export const update_ = (req, res) => {
    return update_helper(req, res)
}

export const getdetails_ = (req, res) => {
    return getdetails_helper(req, res)
}

export const delete_ = (req, res) => {
    return delete_helper(req, res)
}

export const getresult_ = (req, res) => {
    return getresult_helper(req, res)
}

export const uploadresult_ = (req, res) => {
    return uploadresult_helper(req, res)
}

export const deptresult_ = (req, res) => {
    return deptresult_helper(req, res)
}

export const deptcount_ = (req, res) => {
    return deptcount_helper(req, res)
}

export const verifyemail_ = (req, res) => {
    return verifyemail_helper(req, res)
}

export const isverified_ = (req, res, next) => {
    return isverified_helper(req, res, next)
}

export const refreshtoken_ = (req, res, next) => {
    return refreshtoken_helper(req, res, next)
}