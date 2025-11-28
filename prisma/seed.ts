import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const userData: Prisma.UserCreateInput[] = [
  {
    name: "fandresena",
    firstName: "anjara",
    email: "anjarafandresena05@gmail.com",
    password: "12345",
  },
];

const ProjectData: Prisma.ProjectCreateInput[] = [
  {
    title: "create design",
    deadline: "12 - 07 - 2026",
    description: "an simple design for the web app",
    user: {
      connect: {
        email: "anjarafandresena05@gmail.com",
      },
    },
  },
];

const TaskData: Prisma.TaskCreateInput[] = [
  {
    title: "create design",
    deadline: "12 - 07 - 2026",
    description: "an simple design for the web app",
    user: {
      connect: {
        email: "anjarafandresena05@gmail.com",
      },
    },
    project: {
      connect: {
        id: 1,
      },
    },
  },
];

export async function main() {
  for (const data of userData) {
    await prisma.user.create({ data: data });
  }
  for (const data of ProjectData) {
    await prisma.project.create({ data: data });
  }
  for (const data of TaskData) {
    await prisma.task.create({ data: data });
  }
}
