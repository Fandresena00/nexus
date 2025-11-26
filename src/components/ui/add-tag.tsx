import React from "react";
import FormTitleSection from "./project/form/form-title-section";

export default function AddTag() {
  return (
    <div className="mb-8">
      <FormTitleSection title="Tags" />

      <div className="mb-5 px-5">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Ajouter des tags
        </label>
        <div className="relative flex min-h-24 flex-wrap gap-2 border border-gray-600 rounded-lg">
          <span className="flex items-center h-8 gap-3 py-1 px-2.5 bg-gray-300 text-gray-900 rounded-lg text-[13px] font-medium">
            Frontend
            <button
              type="button"
              className="font-black cursor-pointer text-lg transition-all hover:text-red-600"
            >
              ×
            </button>
          </span>
          <span className="flex items-center h-8 gap-1 py-1 px-2.5 bg-gray-300 text-gray-900 rounded-lg text-[13px] font-medium">
            UI/UX
            <button
              type="button"
              className="font-black cursor-pointer text-lg transition-all hover:text-red-600"
            >
              ×
            </button>
          </span>
          <input
            type="text"
            className="absolute w-full h-full text-center placeholder:text-center"
            placeholder="Ajouter un tag..."
          />
        </div>
        <p className="text-xs text-gray-800 font-bold m-1.5">
          Appuyez sur Entrée pour ajouter un tag
        </p>
      </div>
    </div>
  );
}
