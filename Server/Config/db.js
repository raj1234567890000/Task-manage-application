import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to database ${conn.connection.host}`)

    }catch(err){
        console.error(`err${err}`);
    }
}
export default connectDB;