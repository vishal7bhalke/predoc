import jwt from 'jsonwebtoken'

//user authentication middleware
const authuser = async(req,res,next) =>{
    try{
const {token}= req.headers

if(!token){
    return res.json({success:false,message: "not authorized login again"})
}
const token_decode= jwt.verify(token,process.env.JWT_SECRET)
if (!token_decode.id) {
    return res.json({ success: false, message: "Invalid token structure" });
}



    // Add userid without overwriting existing req.body
        req.body = { ...req.body, userid: token_decode.id };
       
next()
    }catch(error){
    
        console.log("in authuser:",error)
        res.json({success:false, message:error.message})
    }
}

export default authuser