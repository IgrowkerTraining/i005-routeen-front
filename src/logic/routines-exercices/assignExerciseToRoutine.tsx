import axios from "../../api/axiosInstance";

const assignExerciseToRoutine = async (data: {
  routine_id: string;
  exercise_id: string;
  reps: number;
  series: number;
  weight_kg?: number;
  rest_time_s?: number;
  desired_order?: number;
}) => {
  const res = await axios.post("/routine-exercise", data, {
    withCredentials: true,
  });

  return res.data;
};

export default assignExerciseToRoutine;