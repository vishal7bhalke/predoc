import jwt from 'jsonwebtoken'

//doctor authentication middleware
const authdoctor = async(req,res,next) =>{
    try{
const {dtoken}= req.headers

if(!dtoken){
    return res.json({success:false,message: "not authorized login again"})
}
const token_decode= jwt.verify(dtoken,process.env.JWT_SECRET)
if (!token_decode.id) {
    return res.json({ success: false, message: "Invalid token structure" });
}



    // Add userid without overwriting existing req.body
        req.body = { ...req.body, docid: token_decode.id };
       
next()
    }catch(error){
    
        console.log("in authuser:",error)
        res.json({success:false, message:error.message})
    }
}

export default authdoctor