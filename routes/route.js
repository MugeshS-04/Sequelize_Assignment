import express from 'express'
import { upload } from '../helper/file_upload.js'
import { create_, delete_, read_, update_, getresult_, uploadresult_} from '../controllers/controller.js'

const router = express.Router()

router.post("/create", create_)
router.post("/delete", delete_)
router.post("/read", read_)
router.post("/update", update_)

router.post("/uploadresult", upload, uploadresult_)
router.get("/getresult", getresult_)


export default router