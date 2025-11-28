import {
  BookMarked,
  CalendarDays,
  ChartColumnBigIcon,
  FileSliders,
  ImageMinusIcon,
  LogOut,
  Settings,
  UserIcon,
} from "lucide-react";
import NavLink from "../ui/nav-link";
import NavSectionTitle from "../ui/sidebar/nav-section-title";
import NavProjectLink from "../ui/sidebar/nav-project-link";
import AvatarCircle from "../ui/avatar-circle";
import Logo from "../ui/logo";
import prisma from "@/src/lib/prisma";

export default async function Sidebar() {
  const projects = await prisma.project.findMany();

  return (
    <aside className=" flex flex-col w-72 h-full bg-white transition-all shadow shadow-gray-600/40 z-50">
      {/** Logo */}
      <div className="flex h-[72px] justify-center items-center gap-3 border-b border-b-gray-500/50">
        <Logo />
        <span className="text-xl font-bold text-gray-600 whitespace-nowrap">
          Nexus
        </span>
      </div>

      {/**  Navigation */}
      <nav className="scrollbar flex-1 overflow-y-auto py-5">
        {/**  Main Section */}
        <div className="mb-5 flex flex-col gap-2">
          <NavSectionTitle title="principal" />
          {/** Link */}
          <NavLink
            title="Dashboard"
            href="/dashboard"
            icon={<ChartColumnBigIcon size={20} />}
            active
          />
          <NavLink
            title="Today"
            href="/today"
            icon={<CalendarDays size={20} />}
            badge="5"
          />

          <NavLink
            title="Project"
            href="/project"
            icon={<FileSliders size={20} />}
          />
        </div>

        {/**  Projects Section */}
        <div className="mb-5 flex flex-col gap-2">
          <NavSectionTitle title="project" />
          {/** Link */}
          {projects.map((e) => (
            <NavProjectLink key={e.id} title={e.title} badge="6" />
          ))}
        </div>

        {/**  Teams Section */}
        <div className="nav-section">
          <NavSectionTitle title="team" />
          <NavLink
            title="Design"
            href="/design"
            icon={<ImageMinusIcon size={20} />}
          />
          <NavLink
            title="Marketing"
            href="/marketing"
            icon={<BookMarked size={20} />}
          />
        </div>

        {/**  Settings Section */}
        <div className="nav-section">
          <NavSectionTitle title="settings" />

          <NavLink
            title="Preference"
            href="/preference"
            icon={<Settings size={20} />}
          />
          <NavLink
            title="Profil"
            href="/profil"
            icon={<UserIcon size={20} />}
          />
          <NavLink title="Log out" href="/login" icon={<LogOut size={20} />} />
        </div>
      </nav>

      {/**  User Profile */}
      <div className="border border-gray-400 p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all">
          <AvatarCircle initial="JD" />
          <div className="flex flex-col overflow-hidden">
            <div className="text-sm font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis ">
              Jean Dupont
            </div>
            <div className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
              jean@acme.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
