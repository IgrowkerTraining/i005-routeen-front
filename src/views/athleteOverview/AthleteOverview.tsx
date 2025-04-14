import { useState } from "react";
import { useParams } from "react-router-dom";

export const AthleteOverview = () => {
  const [activeTab, setActiveTab] = useState<"info" | "plan" | "progress">("plan")
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
      <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
        {/* Header */}
        <div className="mb-4">
                  <h3 className="text-center font-semibold text-lg text-notblack-400">
{`Alumno ${id}`}                      
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-4">
          {["info", "plan", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "info" | "plan" | "progress")}
              className={`flex-1 text-center py-2 text-notblack-400  ${activeTab === tab
                ? "border-b-2 border-notblack-400 font-bold "
                : ""
                }`}
            >
              {tab === "info" && "Información"}
              {tab === "plan" && "Planificación"}
              {tab === "progress" && "Progreso"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "info" && (
            <div className="text-notblack-400">Contenido de Información</div>
          )}
          {activeTab === "plan" && (
            <div className="text-notblack-400">Contenido de Planificación</div>
          )}
          {activeTab === "progress" && (
            <div className="text-notblack-400">Contenido de Progreso</div>
          )}
        </div>
      </div>
    </div>
  );
};
