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

export interface IUser {
	token: number;
}
