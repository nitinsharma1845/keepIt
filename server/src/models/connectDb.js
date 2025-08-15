import mongoose from "mongoose";
export const connectDb = async () => {
    // console.log("Inside connectDB and MONGO URI IS :::" , process.env.MONGO_DB_URI)
    try {
        const instance = await mongoose.connect(`${process.env.MONGO_DB_URI}`)
        console.log("Database connected sucessfully ::: ")
    } catch (error) {
        console.log("Databse connection error ::: " , error)
        process.exit(1)
    }
};
