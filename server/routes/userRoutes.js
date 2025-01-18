const express = require("express");
const {
	userRegisterPost,
	userLoginPost,
	getCurrentUser,
	forgetPassword,
	resetPassword,
} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", userRegisterPost);
userRouter.post("/login", userLoginPost);
userRouter.get("/current", authMiddleware, getCurrentUser);
userRouter.patch("/forgetpassword", forgetPassword);
userRouter.patch("/resetpassword/:email", resetPassword);

module.exports = userRouter;
