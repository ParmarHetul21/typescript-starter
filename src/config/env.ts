import "dotenv/config";

export const env = {
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_KEY: process.env.JWT_KEY,
	REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY
};
