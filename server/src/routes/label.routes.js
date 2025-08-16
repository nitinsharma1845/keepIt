import { Router } from "express";
import { createLable, getAllLables, updateLable } from "../controllers/label.controller.js";
import { authlayer } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/created-lable' , authlayer , createLable)
router.post('/update-lable/:lableId' , authlayer , updateLable)
router.get('/get-lables' , authlayer , getAllLables)


export default router