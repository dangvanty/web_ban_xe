const catchAsyncErrors = require('../middleware/catchAsyncError')
const User = require('../models/user.model')
const cloudinary =require("cloudinary")
const sendToken=require("../utils/jwtToken");
//Register a User
exports.registerUser=catchAsyncErrors( async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
      const { name, email, password }= req.body;
      const user= await User.create({
          name,
          email,
          password,
          avatar:{
              public_id:myCloud.public_id,
              url:myCloud.secure_url,
          },
      })
  
      sendToken(user,201,res);
  })
  
