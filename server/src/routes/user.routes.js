import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

// router.get('/' , (req , res)=>{
//     res.send("User route")
// })

// router.route('/env').get((req , res)=>{
//     res.send("ENV")
// })

// these are two ways to setup routes 

router.route('/register').post(upload.single('avatar'), registerUser)



export default router