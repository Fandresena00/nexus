"use client";

import { createProject } from "@/app/actions/project-action";
import NavButton from "@/src/components/personnal/nav-button";
import FormTitleSection from "@/src/components/personnal/project/form/form-title-section";
import { LoaderPinwheelIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function NewProject({ userId }: { userId: string }) {
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [deadline, SetDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const HandleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject(title, description, deadline, userId);
      router.refresh();
      router.push("/project");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={HandleCreateProject}
      className="flex flex-col max-h-[85vh] overflow-hidden bg-white rounded-xl w-full max-w-3xl shadow-2xl shadow-gray-600/50 "
    >
      {/**  Header  */}
      <div className="py-5 px-8 border-b border-b-gray-500">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-blue-950">
            Créer un nouveau projet
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Définissez les paramètres de votre projet et invitez votre équipe
        </p>
      </div>

      {/** Form Body */}
      <div className="scrollbar flex-1 p-8 overflow-y-auto">
        <div id="projectForm">
          {/** Informations de base */}
          <div className="mb-8">
            <FormTitleSection title="Informations de base" />

            {/** Title of project */}
            <div className="mb-5 px-5">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  SetTitle(e.target.value);
                }}
                className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm"
                placeholder="project title"
                required
              />
            </div>

            {/** Description */}
            <div className="mb-5 px-5">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  SetDescription(e.target.value);
                }}
                className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm"
                placeholder="project description"
                required
              />
            </div>
          </div>

          {/** Planning */}
          <div className="mb-8">
            <FormTitleSection title="Planning" />

            <div className="grid grid-cols-2 gap-2.5">
              <div className="mb-5 px-5">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => {
                    SetDeadline(e.target.value);
                  }}
                  className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Footer */}
      <div className="flex justify-end py-4  px-16 gap-6 border-t border-t-gray-600">
        <NavButton text="annuler" principal />
        <button
          className={`relative flex items-center justify-center gap-1 whitespace-nowrap text-xs font-bold cursor-pointer transition-all rounded-lg active:translate-y-0.5
                text-white tracking-wide py-0.5 px-2 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5  `}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center gap-1.5">
              <LoaderPinwheelIcon
                size={20}
                className="animate-spin text-white"
              />
              <p>loading</p>
            </div>
          ) : (
            "Créer le projet"
          )}
        </button>
      </div>
    </form>
  );
}
