import { IUserRegister, Iusers } from "./typings/schemas";
import {
	addPersistent,
	checkUserExists,
	createUser,
	fetchAll,
	getUserById,
	updatePersistedUser
} from "./user-queries";
import { generateAccessToken, hashPassword } from "../../common/utils";

export const register = async (data: IUserRegister) => {
	try {
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
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const checkCredentials = async (data: IUserRegister) => {
	const existedUser = await checkUserExists(data.email);
	if (existedUser?.password === hashPassword(data.password)) {
		const tokenDetails = generateAccessToken(data.email);
		const persitTokens = {
			...tokenDetails,
			userId: existedUser?.id
		};

		const persisted = await addPersistent(persitTokens);
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

export const accessService = async (data: Iusers) => {
	const userDetails = await getUserById(data.userId);
	const tokenDetails = generateAccessToken(userDetails?.email as string);
	const updatedTokens = await updatePersistedUser(tokenDetails, data.id);
	if (updatedTokens) {
		return {
			success: true,
			message: "Tokens are refreshed",
			data: {
				accessToken: updatedTokens.accessToken,
				refreshToken: updatedTokens.refreshToken
			}
		};
	}
	return {
		success: false,
		message: "Tokens are no refreshed"
	};
};
