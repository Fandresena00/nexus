import Link from "next/link";
import AvatarCircle from "../avatar-circle";
import NavButton from "../nav-button";
import { Settings2Icon, LinkIcon } from "lucide-react";

export default function ProjectCard({
  title,
  description,
  projectId,
  progression,
}: {
  title: string;
  description: string;
  projectId: string;
  progression: string;
}) {
  return (
    <Link
      href={`/project/${projectId}/kanban`}
      className="cursor-pointer bg-transparent shadow shadow-gray-400  hover:shadow-lg hover:shadow-gray-700/50 hover:-translate-y-0.5  transition-all"
    >
      <div className="relative overflow-hidden rounded-lg bg-white p-6 cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-2 before:bg-blue-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-blue-950 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-normal mb-4 line-clamp-2 overflow-hidden">
              {description}
            </p>
          </div>
          <NavButton icon={<Settings2Icon size={18} />} />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600">Progression</span>
            <span className="text-[13px] font-semibold text-gray-800">
              {progression} %
            </span>
          </div>
          <div className="h-2 bg-gray-300 overflow-hidden rounded-lg">
            <div
              className={`h-full rounded-lg transition-all bg-blue-700 w-[${progression}%]`}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AvatarCircle initial="af" small />
            <AvatarCircle initial="af" small />
          </div>
          <NavButton text="Go" icon={<LinkIcon size={14} />} principal />
        </div>
      </div>
    </Link>
  );
}
