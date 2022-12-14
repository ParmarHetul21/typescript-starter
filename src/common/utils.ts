import { createHash, generateKeyPairSync } from "crypto";
import { sign } from "jsonwebtoken";

/**
 * @param data user password then hash256 password
 */
export const hashPassword = (data: string) => {
	const buf = Buffer.from(data, "utf8");
	const hasData = createHash("sha256").update(buf).digest("hex");
	return hasData;
};

/**
 * generate JWT_Token on payload
 *
 * @param {IUserRegister} payload - user details
 */
export const generateAccessToken = (payload: string) => {
	// generating the access token
	const keys = generateKeyPairSync("rsa", {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: "spki",
			format: "pem"
		},
		privateKeyEncoding: {
			type: "pkcs8",
			format: "pem"
		}
	});

	const jwtToken = sign({ email: payload }, keys.privateKey as string, {
		algorithm: "RS256",
		expiresIn: "2m"
	});
	const refreshToken = sign({ email: payload }, keys.privateKey as string, {
		algorithm: "RS256",
		expiresIn: "4m"
	});

	return {
		accessToken: jwtToken,
		publicKey: keys.publicKey as string,
		refreshToken: refreshToken
	};
};
