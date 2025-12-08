import jwt from 'jsonwebtoken'

export const access_verify = async (req, res, next) => {
    
    try{
        const header = req.headers["authorization"]

        const token = header.split(" ")[1]

        const isvalid = jwt.verify(token, process.env.JWT_ACCESS_SECRETKEY)
        
        req.user = isvalid

        next()
    }
    catch(error)
    {
        return res.json({success : false, message : error.message})
    }
} 

export const refresh_verify = (req, res, next) => {
    
    try{
        const header = req.headers["authorization"]

        const token = header.split(" ")[1]

        const isvalid = jwt.verify(token, process.env.JWT_REFRESH_SECRETKEY)

        req.user = isvalid
        
        next()
    }
    catch(error)
    {
        return res.json({success : false, message : "Error in received token!"})
    }
} 