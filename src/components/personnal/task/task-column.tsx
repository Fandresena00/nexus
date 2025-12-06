import React from "react";

export default function TaskColumn({
  children,
  title,
  onDragOver,
  onDragLeave,
  onDrop,
  isDraggedOver,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  isDraggedOver?: boolean;
}>) {
  const taskCount = React.Children.count(children);

  return (
    <div
      className={`flex flex-col min-w-[320] max-w-[320] rounded-lg p-4 transition-colors ${
        isDraggedOver ? "bg-blue-50 border-2 border-blue-300 border-dashed" : ""
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-2 pb-3 mt-2">
        {/** Title of column */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {title}
          </h3>
        </div>

        {/** number of task */}
        <span className="bg-white text-blue-950 py-1 px-2 rounded-lg text-xs font-semibold">
          {taskCount}
        </span>
      </div>

      {/** Task card */}
      <div className="flex flex-col pb-5 gap-2">{children}</div>
    </div>
  );
}
