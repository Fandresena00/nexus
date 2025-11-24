import Divider from "@/src/components/ui/divider";
import Logo from "@/src/components/ui/logo";
import NavButton from "@/src/components/ui/nav-button";
import { PlusCircle, Users, Settings2 } from "lucide-react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/** Navigation */}
      <nav className="sticky top-0 z-40 px-6 bg-white border-b border-b-gray-500 shadow shadow-gray-600/50">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto ">
          <div className="flex items-center gap-8">
            {/** Logo and Project name */}
            <div className="flex items-center gap-2.5 text-xl font-bold text-blue-950">
              <Logo />
              <span>Title</span>
            </div>

            {/** change task view */}
            <div className="flex gap-3.5 items-center">
              <NavButton text="Kanban" active />
              <Divider />
              <NavButton text="List" />
            </div>
          </div>

          {/** Principal button */}
          <div className="flex items-center gap-3.5">
            <NavButton
              text="New task"
              icon={<PlusCircle size={18} />}
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
