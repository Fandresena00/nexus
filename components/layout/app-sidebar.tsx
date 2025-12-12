import { getSession } from "@/lib/auth-server";
import AppSidebarClient from "./app-sidebar-client";
import prisma from "@/lib/prisma";

export default async function AppSidebar() {
  const session = await getSession();

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          userId: session?.id,
        },
        {
          access: {
            some: {
              userId: session?.id,
            },
          },
        },
      ],
    },
  });

  return (
    <AppSidebarClient
      session={session}
      projects={projects.map((p) => ({ id: p.id, title: p.title }))}
    />
  );
}
