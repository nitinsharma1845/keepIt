import dotenv from 'dotenv'
dotenv.config({
    path : './.env'
})
import app from "./app.js";
import { connectDb } from './models/connectDb.js';


connectDb()
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`Server started at https://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("SERVER ERROR ::: " , err)
})

