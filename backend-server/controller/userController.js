import ErrorHandler from "../middleware/error.js";
import { User } from "../model/userModel.js";
import { sendCookies } from "../utils/feature.js";

// login or user doesn't created in db, it will automatically created in DB because of google auth 
export const login = async (req, res, next) => {
    try {
      const { email, name } = req.body;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        // User doesn't exist, create a new user
        user = await User.create({ email, name });
  
        // Set cookie for the new user
        sendCookies(user, res, "Registered successfully", 201);
      } else {
        // User exists, set cookie for the existing user
        sendCookies(user, res, `Welcome back, ${user.name}`, 200);
      }
    } catch (error) {
      next(error);
    }
  };

//Logout

export const logout = async (req, res, next) => {
  res.clearCookie('token-z', { httpOnly: true });
  res.status(200).json({ success: true, message: 'Logout successful' });
  };

//get all user Profile 
export const getAllUsers=async (req, res,next) => {

    try {
      
    const users=await User.find()
    
    if (users.length===0) {
      return next(new ErrorHandler("no users found",400))
    }
    
    res.status(200).json({
      success:true,
     users
    })
    } catch (error) {
      next(error)
    }
      
    
    }