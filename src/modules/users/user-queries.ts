import db from "../../config/db";
import { IPersisted, IUserRegister } from "./typings/schemas";

export const createUser = async (data: IUserRegister) => {
	const user = await db.user.create({ data });
	if (user) {
		return user;
	}
	return false;
};

export const checkUserExists = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email: email
		},
		select: {
			password: true,
			id: true
		}
	});
	return user;
};

export const addPersistent = async (data: IPersisted) => {
	const persist = await db.persistentToken.create({ data });
	return persist;
};

export const fetchAll = async () => {
	const users = await db.user.findMany({ select: { email: true, id: true } });
	return users;
};

export const persistedUser = async (token: string) => {
	const usersPersisted = await db.persistentToken.findFirst({
		where: {
			accessToken: token
		}
	});

	return usersPersisted;
};
