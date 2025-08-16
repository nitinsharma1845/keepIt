// const asyncHandler = (fn) =>{
//     return (req , res , next) =>{
//         Promise.resolve(fn(req , res , next)).catch(next)
//     }
// }
//if we use it we have to add a middleware to handle the rror and send the response accordingly

const asyncHandler = (fn) => async (req , res , next) =>{
    try {
        return await fn(req , res , next)
    } catch (error) {
        res.status(Number(error.statusCode) || 500).json({
            message : error.message || "Internal Server Error ::: ",
            sucess : false
        })
    }
}


export {asyncHandler}