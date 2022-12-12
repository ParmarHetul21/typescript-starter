import winston, { createLogger } from "winston";
import "dotenv/config";
import "winston-daily-rotate-file";

/**
 * winston configuration for logger
 * @returns Object
 */

const combineFileTransport = new winston.transports.DailyRotateFile({
	dirname: "logs/combined",
	filename: "%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "100m"
});

const errorFileTransport = new winston.transports.DailyRotateFile({
	dirname: "logs/error",
	filename: "%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "100m",
	level: "error"
});

const logger = createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "TypeScript-Starter" },
	transports: [combineFileTransport, errorFileTransport]
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.json()
		})
	);
}

export default logger;
