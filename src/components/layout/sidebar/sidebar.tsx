import SidebarClient from "./sidebar-client";
import ProjectsList from "./projects-list";

export default function Sidebar() {
  return (
    <SidebarClient>
      <ProjectsList />
    </SidebarClient>
  );
}
