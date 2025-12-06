import Divider from "@/src/components/personnal/divider";
import Logo from "@/src/components/personnal/logo";
import NavButton from "@/src/components/personnal/nav-button";
import prisma from "@/lib/prisma";
import { PlusCircle, Users, Settings2 } from "lucide-react";

export default async function layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { projectId: string };
}>) {
  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  return (
    <div>
      {/** Navigation */}
      <nav className="sticky top-0 z-40 px-6 bg-white border-b border-b-gray-500 shadow shadow-gray-600/50">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto ">
          <div className="flex items-center gap-8">
            {/** Logo and Project name */}
            <div className="flex items-center gap-2.5 text-xl font-bold text-blue-950">
              <Logo />
              <span>{project?.title}</span>
            </div>

            {/** change task view */}
            <div className="flex gap-3.5 items-center">
              <NavButton
                text="Kanban"
                href={`/project/${projectId}/kanban`}
                link
                active
              />
              <Divider />
              <NavButton text="List" href={`/project/${projectId}/list`} link />
            </div>
          </div>

          {/** Principal button */}
          <div className="flex items-center gap-3.5">
            <NavButton
              // Dynamic hrefs like `/project/[projectId]/kanban` are not supported in <Link> in the App Router.
              // We need to use the correct projectId in the href. Since we are at `[projectId]/layout.tsx`, use `useParams` to get projectId.
              // But this is a client-side hook, so mark this component as "use client" and extract projectId from params.
              // Insert nothing here, and see NOTE below.
              text="New task"
              icon={<PlusCircle size={18} />}
              href={`/project/${projectId}/new`}
              link
              principal
            />
            <Divider />
            <NavButton text="Team" icon={<Users size={18} />} principal />
            <Divider />
            <NavButton
              text="Settings"
              icon={<Settings2 size={18} />}
              principal
            />
          </div>
        </div>
      </nav>
      <div className="h-full">{children}</div>
    </div>
  );
}
