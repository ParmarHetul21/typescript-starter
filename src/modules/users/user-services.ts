import { IUserRegister } from "./typings/schemas";
import { createUser } from "./user-queries";

export const register = async (data: IUserRegister) => {
	const user = await createUser(data);
	if (user)
		return {
			success: true,
			user
		};
	return {
		success: false
	};
};
