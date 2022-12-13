import { IUserRegister } from "./typings/schemas";
import {
	addPersistent,
	checkUserExists,
	createUser,
	fetchAll
} from "./user-queries";
import { generateAccessToken, hashPassword } from "../../common/utils";

export const register = async (data: IUserRegister) => {
	const { password } = data;
	const hash = hashPassword(password);
	const user = await createUser({ ...data, password: hash });
	if (user)
		return {
			success: true,
			user
		};
	return {
		success: false
	};
};

export const checkCredentials = async (data: IUserRegister) => {
	const existedUser = await checkUserExists(data.email);
	if (existedUser?.password === hashPassword(data.password)) {
		const tokenDetails = await generateAccessToken(data.email);
		const persitTokens = {
			...tokenDetails,
			userId: existedUser?.id
		};

		const persisted = await addPersistent(persitTokens);
		console.log(persisted);
		if (persisted) {
			return {
				success: true,
				metadata: {
					...persisted
				}
			};
		}
	}

	return {
		success: false,
		message: "Not Found"
	};
};

export const getallUsers = async () => {
	const users = await fetchAll();
	if (users.length > 0) {
		return {
			success: false,
			message: "No Users Found"
		};
	}

	return {
		success: true,
		message: "User Found",
		data: users
	};
};
