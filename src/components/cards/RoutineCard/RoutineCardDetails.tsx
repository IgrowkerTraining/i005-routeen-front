import { useAuth } from "../../../store/AuthContext";
import { TrainerRoutineCardDetails } from "./TrainerRoutineCardDetails";
import { AthleteRoutineCardDetails } from "./AthleteRoutineCardDetails";

export const RoutineCardDetails = () => {
  const { user } = useAuth();

  if (!user) return <div>Cargando usuario...</div>;

  return user.role === "trainer"
    ? <TrainerRoutineCardDetails />
    : <AthleteRoutineCardDetails />;
};
