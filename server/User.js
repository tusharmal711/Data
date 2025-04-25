// create a schema
import mongoose from "mongoose";
const data=new mongoose.Schema({
    name : String , 
    email : String ,
    password : String,
    date : {
       type : Date,
       default : Date.now
    },
    image:String,
    video:String
   });
   
   
   // create a model
   export default mongoose.model("datas",data);