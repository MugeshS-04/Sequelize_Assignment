import { create_helper, update_helper, read_helper, delete_helper, getresult_helper, uploadresult_helper } from "../helper/helper.js"

export const create_ = (req, res) => {
    return create_helper(req, res)
}

export const update_ = (req, res) => {
    return update_helper(req, res)
}

export const read_ = (req, res) => {
    return read_helper(req, res)
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