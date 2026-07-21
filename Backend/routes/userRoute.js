import express from "express";
import { getCurrentUser, login, register } from "../controllers/userController.js";
import  {authMiddleware}  from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/me",authMiddleware,getCurrentUser)

export default userRouter;
