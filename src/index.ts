import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./config/logger";
import { userRouter } from "./modules/users/user-routes";
import { isAuthenticated } from "./middleware/auth";
import { createAccessToken } from "./modules/users/user-controllers";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (_request: Request, response: Response): void => {
	response.send("Express+TypeScript");
});

app.use("/user", userRouter);
app.post("/refresh", isAuthenticated, createAccessToken);

app.use((_request: Request, response: Response): void => {
	response.status(500).json({
		response
	});
});

const server = app.listen(4400, (): void => {
	logger.log({
		level: "info",
		message: "Server started http:localhost:4400"
	});
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	logger.error(err.stack);
	res.status(res.locals.status).json(err.message);
});

process.on("uncaughtException", (error) => {
	logger.error({
		success: false,
		message: error
	});
	server.close(() => {
		console.log("Stopped Server Due to uncaughtException");
	});
});
