
import axios from "../../api/axiosInstance";

const getExercisesByRoutineId = async (routineId: string) => {
  const res = await axios.get(`/routine-exercise`, {
    params: { routine_id: routineId },
    withCredentials: true,
  });

  return res.data.exercises;
};

export default getExercisesByRoutineId;
