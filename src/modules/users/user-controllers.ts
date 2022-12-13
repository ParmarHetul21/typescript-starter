import { Request, Response } from "express";
import { register, checkCredentials, getallUsers } from "./user-services";

export const create = async (req: Request, res: Response) => {
	const response = await register(req.body);
	res.status(200).json(response);
};

export const login = async (req: Request, res: Response) => {
	const response = await checkCredentials(req.body);
	res.status(200).json(response);
};

export const getStudents = async (_req: Request, res: Response) => {
	const response = await getallUsers();
	res.status(200).json(response);
};
