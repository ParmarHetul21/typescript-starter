import db from "../../config/db";
import { IUserRegister } from "./typings/schemas";

export const createUser = async (data: IUserRegister) => {
	const user = await db.user.create({ data });
	if (user) {
		return user;
	}
	return false;
};
