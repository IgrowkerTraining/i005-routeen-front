import axios from "../../api/axiosInstance";

const getExercisesAssigned = async (athleteId: string, routineAssignedId: string) => {
  const res = await axios.get(
    `/athlete/${athleteId}/routineAssigned/${routineAssignedId}/exerciseAssigned`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export default getExercisesAssigned;
