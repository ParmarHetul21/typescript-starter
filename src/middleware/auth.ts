import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../modules/users/typings/schemas";
import { persistedUser } from "../modules/users/user-queries";
import { users } from "./typings/types";

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.refreshToken) {
		const token = req.body.refreshToken;
		const users = await persistedUser(token);
		if (!users) {
			res.status(401).json({
				success: false,
				message: "Refresh Token Not Found"
			});
			return;
		}
		req.body = { ...req.body, user: users } as users;
		next();
		return;
	}

	if (!req.headers.authorization?.includes(" ")) {
		res.status(401).json({
			success: false,
			message: "Token Not Found inside Headers"
		});
		return;
	}

	const [type, token] = req.headers.authorization.split(" ");
	if (!token || type !== "Bearer") {
		res.status(401).json({ success: false, message: "UnAuthorized" });
		return;
	}
	const keys = await persistedUser(token);
	return verify(token, keys?.publicKey as string, (err, result) => {
		if (err) {
			res.status(401).json({
				success: false,
				message: err
			});
			return;
		}
		res.locals = result as Record<string, string | number> & IUser;
		next();
	});
};
