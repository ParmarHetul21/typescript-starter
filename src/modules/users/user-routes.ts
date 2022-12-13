import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth";
import { create, login, getStudents } from "./user-controllers";

export const userRouter = Router();

userRouter.post("/", create);
userRouter.post("/login", login);
userRouter.get("/", isAuthenticated, getStudents);
