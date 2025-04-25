import axios from "../../api/axiosInstance";

const getRoutineAssigned = async (athleteId: string, routineAssignedId: string) => {
  const res = await axios.get(`/athlete/${athleteId}/routineAssigned/${routineAssignedId}`, {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export default getRoutineAssigned;
