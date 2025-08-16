import { Router } from "express";
import { currentUser, loginUser, logout, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authlayer } from "../middlewares/auth.middleware.js";

const router = Router()

// router.get('/' , (req , res)=>{
//     res.send("User route")
// })

// router.route('/env').get((req , res)=>{
//     res.send("ENV")
// })

// these are two ways to setup routes 

// console.log(upload)
// console.log(registerUser)

router.route('/signup').post( upload.single('avatar'), registerUser)

router.post('/login' , loginUser)

router.get('/me' , authlayer , currentUser )

router.route('/logout').post(authlayer , logout)


export default router