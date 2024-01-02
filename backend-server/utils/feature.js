import jwt from "jsonwebtoken";

export const sendCookies = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "None", // or "Lax" depending on your requirements
      secure: true, // Use true if served over HTTPS
    })
    
    .json({
      success: true,
      message,
    });
};
