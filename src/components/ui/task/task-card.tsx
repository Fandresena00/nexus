import AvatarCircle from "../avatar-circle";

export default function TaskCard({
  taskId,
  title,
  description,
  days,
  month,
  years,
}: {
  taskId: string;
  title: string;
  description: string;
  days: string;
  month: string;
  years: string;
}) {
  return (
    <div className="bg-white p-3.5 border border-gray-300 rounded-xl cursor-pointer transition-all hover:border-gray-400 hover:shadow-lg hover:shadow-gray-700/50 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-2">
        {/** Task id */}
        <span className="text-[11px] text-gray-500 font-semibold">
          {taskId}
        </span>
        {/** Level of important */}
        <div className="w-1.5 h-1.5 rounded-full mt-1 bg-red-600"></div>
      </div>

      {/** Title of task */}
      <h4 className="text-sm font-semibold text-gray-700 mb-1.5 leading-snug">
        {title}
      </h4>

      {/** Description */}
      <p className="text-[13px] text-gray-500 leading-normal mb-3">
        {description}
      </p>

      {/** Tag task */}
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        <span className="flex items-center h-5 px-2 rounded-sm text-[11px] font-bold tracking-wide border bg-orange-200 text-orange-900 border-orange-300">
          Backend
        </span>
        <span className="flex items-center h-5 px-2 rounded-sm text-[11px] font-bold tracking-wide border bg-green-200 text-green-900 border-green-300">
          features
        </span>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-t-gray-500">
        {/** Team members */}
        <div className="flex items-center gap-0.5">
          <AvatarCircle initial="fr" small />
          <AvatarCircle initial="hb" small />
        </div>

        {/** Date of the end */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span>{days}</span>
          <span>{month}</span>
          <span>{years}</span>
        </div>
      </div>
    </div>
  );
}
