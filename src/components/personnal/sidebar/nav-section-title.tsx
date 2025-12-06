import React from "react";

export default function NavSectionTitle({ title }: { title: string }) {
  return (
    <div className="py-2 px-5 text-[11px] font-bold text-blue-500 uppercase tracking-wide ">
      {title}
    </div>
  );
}
