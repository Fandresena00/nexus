import { BellIcon, MessageCircleMore, SidebarCloseIcon } from "lucide-react";
import NavButton from "../personnal/nav-button";
import AvatarCircle from "../personnal/avatar-circle";
import Divider from "../personnal/divider";
import { getSession } from "@/src/lib/auth-server";
import NextImage from "next/image";

export default async function Navbar() {
  const session = await getSession();

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
            {session?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <NextImage
                  src={session.image}
                  alt={session.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <AvatarCircle
                initial={`${session?.name[0]}${
                  session?.name[session.name.length - 1]
                }`}
              />
            )}

            <div className="relative flex flex-col items-center max-w-24">
              <div className="text-xs max-w-full font-bold text-blue-950 whitespace-nowrap overflow-hidden text-ellipsis">
                {session?.name}
              </div>
              <div className="text-xs max-w-full text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                {session?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
