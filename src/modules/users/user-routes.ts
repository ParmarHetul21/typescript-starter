import { Router } from "express";
import { create } from "./user-controllers";

export const userRouter = Router();

userRouter.post("/", create);
