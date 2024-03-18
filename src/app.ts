import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

export const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Nicollas",
    email: "nicolas@gmail.com",
  },
});
