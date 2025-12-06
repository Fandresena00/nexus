import { getUserProjects } from "@/app/actions/project-action";
import { getSession } from "@/src/lib/auth-server";
import prisma from "@/src/lib/prisma";
import NavProjectLink from "../../personnal/sidebar/nav-project-link";

export default async function ProjectsList() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const projects = await getUserProjects(session.id);

  // Get task count for each project
  const projectsWithTaskCount = await Promise.all(
    projects.map(async (project) => {
      const taskCount = await prisma.task.count({
        where: { projectId: project.id },
      });
      return {
        ...project,
        taskCount,
      };
    }),
  );

  if (projectsWithTaskCount.length === 0) {
    return null;
  }

  return (
    <>
      {projectsWithTaskCount.map((project, index) => (
        <NavProjectLink
          key={project.id}
          title={project.title}
          badge={project.taskCount.toString()}
          href={`/project/${project.id}/kanban`}
          colorIndex={index}
        />
      ))}
    </>
  );
}
