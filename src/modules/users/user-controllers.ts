import { Request, Response } from "express";
import { register } from "./user-services";

export const create = async (req: Request, res: Response) => {
	const response = await register(req.body);
	res.status(200).json(response);
};
