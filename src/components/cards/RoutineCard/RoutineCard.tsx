import { useNavigate } from "react-router-dom";
import { Routine } from "../../../logic/interfaces/trainer";

interface RoutineCardProps {
  routine: Routine;
  selectedId?: string | null;
  canSelect?: boolean;
  onSelectionChange?: (id: string | null) => void;
}

export default function RoutineCard({
  routine,
  selectedId,
  canSelect = false,
  onSelectionChange,
}: RoutineCardProps) {
  const navigate = useNavigate();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newSelectedId = selectedId === routine._id ? null : routine._id;
    onSelectionChange?.(newSelectedId);
  };

  return (
    <div
      onClick={() => navigate(`/routine/${routine._id}`)}
      className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 relative cursor-pointer min-h-[80px]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 text-primary-400 font-bold leading-tight break-words">
          <p className="text-lg">{routine.name}</p>
          <p className="text-sm text-gray-600">{routine.description}</p>
        </div>

        {canSelect && (
          <div className="flex-shrink-0 ml-4">
            <input
              type="checkbox"
              checked={selectedId === routine._id}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 accent-primary-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
