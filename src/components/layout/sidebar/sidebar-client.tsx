"use client";

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
import NavLink from "../../personnal/nav-link";
import NavSectionTitle from "../../personnal/sidebar/nav-section-title";
import Logo from "../../personnal/logo";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

type SidebarClientProps = {
  children: React.ReactNode;
};

export default function SidebarClient({ children }: SidebarClientProps) {
  const HandleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          redirect("/signin");
        },
        onError(error) {
          console.log(error.error.message);
        },
      },
    });
  };

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

          {/** Project Links */}
          {children}
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
        </div>
      </nav>
      <div className="py-5 px-3.5">
        <button
          onClick={HandleSignOut}
          className={
            "group w-full py-2.5 cursor-pointer flex items-center gap-3 px-7 rounded-lg border bg-gray-200 border-black text-gray-600 transition-all hover:bg-gray-800"
          }
        >
          <span
            className={
              "flex items-center  justify-center group-hover:text-white shrink-0"
            }
          >
            <LogOut size={18} />
          </span>
          <span
            className={
              "flex font-bold justify-start text-xs whitespace-nowrap group-hover:text-white "
            }
          >
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
}
