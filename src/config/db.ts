import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

prisma.$on("beforeExit", async () => {
	await prisma.$disconnect();
});

const db = {
	user: prisma.user,
	persistentToken: prisma.persistent_Token
};

export default db;
