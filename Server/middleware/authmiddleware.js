import userModel from "../models/userModel"


export const requireSignIn=async(req,res,next)=>{
    try{
const decode=JWT.verify(
    req.header.authorization,
    process.env.JWT_SECRET
);
req.user=decode;
next();
    }catch(err){
        res.status(401).send({message:err.message})
    }
}

export const isAdmin=async(req,res,next)=>{
try{
    const user=await userModel.findById(req.user._id);
    if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"You are not an admin"
    
        })
    
    }
    else{
        next();
    }
}catch(error){
    console.log(error)

}

}