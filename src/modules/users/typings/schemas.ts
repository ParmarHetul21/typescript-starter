export interface IUserRegister {
	email: string;
	password: string;
}

export interface IPersisted {
	accessToken: string;
	publicKey: string;
	refreshToken: string;
	userId: number;
}

export interface Itokens {
	accessToken: string;
	publicKey: string;
	refreshToken: string;
}

export interface IUser {
	token: number;
}

export interface Iusers {
	accessToken: string;
	refreshToken: string;
	userId: number;
	id: number;
	publicKey: string;
}
