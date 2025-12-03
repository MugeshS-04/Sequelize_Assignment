import multer from "multer";

export const upload = async (req, res, next) => {

    const storage = multer.diskStorage({
        destination : "student_results",
        filename : (req, file, cb) =>
        {
            const originalname = file.originalname
            const revisedname = "result" + new Date().valueOf() + originalname.substring(originalname.lastIndexOf('.'))
            cb(null, revisedname)
        }
    })

    const upload = multer({
        storage : storage,
        limits : { fileSize : 10000000 }
    }).single('key')

    upload(req, res, (error) => {
        if(!req.file) return res.json({success : false, message : "Result file is required!"})
        if(error) return res.json({success : false, message : error})
        
        req.body.path = req.file.destination + "/" + req.file.filename
        next()
    })

}





