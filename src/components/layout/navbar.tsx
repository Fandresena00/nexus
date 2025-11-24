import { BellIcon, MessageCircleMore, SidebarCloseIcon } from "lucide-react";
import NavButton from "../ui/nav-button";
import AvatarCircle from "../ui/avatar-circle";
import Divider from "../ui/divider";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b border-b-gray-400 z-50">
      <div className="flex max-w-full px-6 items-center justify-between h-[71px]">
        {/** Left section */}
        <div className="flex items-center gap-6 flex-1">
          <NavButton icon={<SidebarCloseIcon size={20} />} />
        </div>

        {/** Right section */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3.5">
            <NavButton icon={<BellIcon size={18} />} />
            <NavButton icon={<MessageCircleMore size={18} />} badge />
            <NavButton text="Rapports" />
          </div>

          <Divider />

          {/** Profil part */}
          <div className="flex items-center gap-2 py-1.5 px-2.5 bg-blue-50 rounded-3xl cursor-pointer transition-all hover:bg-blue-100">
            <div className="flex flex-col items-end">
              <div className="text-xs font-bold text-blue-950">Jean Dupont</div>
            </div>
            <AvatarCircle initial="JD" />
          </div>
        </div>
      </div>
    </nav>
  );
}
