import NavButton from "@/src/components/ui/nav-button";
import FormInputLabel from "@/src/components/ui/form-input-label";
import FormTitleSection from "@/src/components/ui/project/form/form-title-section";
import TeamItems from "@/src/components/ui/project/team-items";

export default function page() {
  return (
    <div className="flex items-center justify-center p-5 inset-0">
      <div className="flex flex-col max-h-[85vh] overflow-hidden bg-white rounded-xl w-full max-w-3xl shadow-2xl shadow-gray-600/50 ">
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
          <form id="projectForm">
            {/** Informations de base */}
            <div className="mb-8">
              <FormTitleSection title="Informations de base" />
              <FormInputLabel
                label="Nom du projet"
                placeholder="Refonte site web, Application mobile..."
                type="text"
                required
              />
              <FormInputLabel
                label="Description"
                placeholder="Décrivez les objectifs et le contexte du projet..."
                textarea
              />
            </div>

            {/** Planning */}
            <div className="mb-8">
              <FormTitleSection title="Planning" />

              <div className="grid grid-cols-2 gap-2.5">
                <FormInputLabel label="date de fin" type="date" />
              </div>
            </div>

            {/** Team */}
            <div className="mb-8">
              <FormTitleSection title="Team membres" />

              <div className="flex flex-col gap-2">
                <TeamItems />
                <TeamItems />
                <TeamItems />
              </div>
              <button
                type="button"
                className="w-full p-3 border-2 border-dashed border-gray-500 my-2 rounded-lg cursor-pointer text-sm"
              >
                <span>+</span>
                <span>Inviter des membres</span>
              </button>
            </div>
          </form>
        </div>

        {/** Footer */}
        <div className="flex justify-end py-4  px-16 gap-6 border-t border-t-gray-600">
          <NavButton text="annuler" principal />
          <NavButton text="create project" principal />
        </div>
      </div>
    </div>
  );
}
