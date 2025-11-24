import Link from "next/link";
import AvatarCircle from "../avatar-circle";

export default function ProjectCard() {
  return (
    <Link
      href="/project/1/kanban"
      className="w-full px-3.5 py-6 cursor-pointer bg-white rounded-xl shadow shadow-gray-600 transition-all hover:border-gray-400 hover:shadow-lg hover:shadow-gray-700/50 hover:-translate-y-0.5"
    >
      <div className="bg-white p-3.5 border border-gray-300 rounded-xl ">
        {/** Title of project */}
        <h4 className="text-sm font-semibold text-gray-700 mb-1.5 leading-snug">
          Nexus
        </h4>
        {/** Description */}
        <p className="text-[13px] text-gray-500 leading-normal mb-3">
          An web application for project gestion and to do a best portfolio
        </p>

        <div className="flex items-center justify-between pt-2.5 border-t border-t-gray-500">
          {/** Admin of project */}
          <div className="flex items-center gap-0.5">
            <AvatarCircle initial="fr" small />
            <AvatarCircle initial="hb" small />
          </div>

          {/** Date of start and the end */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span>10</span>
              <span>Nov</span>
              <span>2025</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span>15</span>
              <span>Dec</span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
