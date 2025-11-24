import React from "react";

export default function ProjectFrom() {
  return (
    <div className="py-5">
      <form
        action="submit"
        className="flex flex-col items-center justify-center bg-white rounded-lg py-3 px-6"
      >
        {/** title */}
        <div>
          <h2>New project</h2>
          <p>planify your project</p>
        </div>
      </form>
    </div>
  );
}
