import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

const app=express();
import route from "./userRoute.js";
dotenv.config();

const PORT=process.env.PORT || 7000;
const MONGOURL=process.env.MONGO_URL;
app.use(express.json());
app.use(express.static('public'));
import cors from "cors";
app.use(cors({ origin: 'https://userdata-git-main-tushar-mals-projects.vercel.app/' }));

app.listen(PORT,async()=>{
    console.log("Server is running on : localhost :",PORT);
    connectDB();
});
app.get("/",(req,res)=>{
    res.send("Welcome to the home page");
});


// connnection to the data base 

const connectDB = async()=>{
    try{
         await mongoose.connect(MONGOURL);
         console.log("Db is connected");  
    }catch(error){
        console.log("Db is not connected");
        console.log(error.message);
        process.exit(1);
    }
}



app.use("/api",route);

// Call the function to fetch and print all documents


// const fetchUser=async(req,res)=>{
//     try{
//         const user=await data.find({email:"tusharmal711@gmail.com"});
//      if(user!=""){
//         res.status(200).json(fetchUser);
//      }else{
//         console.log("User not found");
//      }
      

//     }catch(e){
//         console.log("User not found");
//     }
    
    
// }
// fetchUser();
// const fetchArpan=async()=>{
   
//         const name=await data.find({email:"pratickmal123@gmail.com"},'name password');
//         console.log(name);
    
// }
// fetchArpan();
// const deleteUser=async(email2)=>{
//     const dUser=await data.deleteOne({email:email2});
//     console.log("Data is deleted from database");
// }
// deleteUser("pratickmal123@gmail.com");
// const deleteUsers=async()=>{
//     const dUser=await data.deleteMany({email:"tusharmal711@gmail.com"});
//     console.log("Data is deleted from database");
// }


// how to updatedata


// const updateUser=async()=>{
//     const uuser=await data.updateOne({name:"Tushar mal banerjeee"},{$set:{name:"Tushar Mal",email:"mithumal@gmail.com"}});
//     console.log("Data updated");
// }
// updateUser();
// const updateUsers=async()=>{
//     const uusers=await data.updateMany({email:"kutti@gmail.com"},{$set:{email:"kutti@gmail.com",password:"Tushar@2025"}});
// }
// updateUsers();