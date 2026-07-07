import express from "express";
import { getCurrentUser, login, register } from "../controller/user.js";
import { authMiddleare } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/me",authMiddleare,getCurrentUser)

export default userRouter;
