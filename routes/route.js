import express from 'express'
import { create_, delete_, read_, update_} from '../controllers/controller.js'

const router = express.Router()

router.post("/create", create_)
router.post("/delete", delete_)
router.post("/read", read_)
router.post("/update", update_)


export default router