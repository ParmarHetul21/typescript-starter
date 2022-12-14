import db from "../../config/db";
import { IPersisted, Itokens, IUserRegister } from "./typings/schemas";

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
			OR: [
				{
					accessToken: token
				},
				{
					refreshToken: token
				}
			]
		}
	});

	return usersPersisted;
};

export const getUserById = async (id: number) => {
	const user = await db.user.findFirst({
		where: {
			id: id
		},
		select: {
			email: true
		}
	});

	return user;
};

export const updatePersistedUser = async (tokens: Itokens, id: number) => {
	const updateTokens = await db.persistentToken.update({
		where: {
			id: id
		},
		data: {
			accessToken: tokens.accessToken,
			publicKey: tokens.publicKey,
			refreshToken: tokens.refreshToken
		}
	});

	return updateTokens;
};
