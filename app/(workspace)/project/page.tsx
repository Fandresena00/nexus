import Divider from "@/src/components/ui/divider";
import Logo from "@/src/components/ui/logo";
import NavButton from "@/src/components/ui/nav-button";
import ProjectCard from "@/src/components/ui/project/project-card";
import prisma from "@/src/lib/prisma";
import { PlusCircle, Settings2 } from "lucide-react";

export default async function page() {
  const allProject = await prisma.project.findMany();

  return (
    <div className="relative ">
      {/** Navigation */}
      <nav className="sticky top-0 z-40 px-6 bg-white border-b border-b-gray-500 shadow shadow-gray-600/50">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto ">
          <div className="flex items-center gap-8">
            {/** Logo and Project name */}
            <div className="flex items-center gap-2.5 text-xl font-bold text-blue-950">
              <Logo />
              <span>All project</span>
            </div>
          </div>

          {/** Principal button */}
          <div className="flex items-center gap-3.5">
            <NavButton
              text="New project"
              icon={<PlusCircle size={18} />}
              href="/project/new"
              link
              principal
            />
            <Divider />
            <NavButton
              text="Settings"
              icon={<Settings2 size={18} />}
              principal
            />
          </div>
        </div>
      </nav>
      {/** project list */}
      <div className="grid grid-cols-3 gap-5 p-10 ">
        {allProject.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            projectId={project.id.toString()}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}
