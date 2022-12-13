import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../modules/users/typings/schemas";
import { persistedUser } from "../modules/users/user-queries";

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
	const userData = verify(token, keys?.publicKey as string, {
		algorithms: ["RS256"]
	});

	res.locals = userData as Record<string, string | number> & IUser;
	next();
};
