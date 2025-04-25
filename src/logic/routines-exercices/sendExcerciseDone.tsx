import axios from "../../api/axiosInstance";

const SendExerciseDone = async (id: string, routine: any) => {
  if (!id || !routine?.routine_id?.name || !routine?.routine_id?.description) {
    console.error("Faltan datos necesarios para registrar la rutina.");
    return;
  }

  const routineHistoryPayload = {
    name: routine.routine_id.name,
    description: routine.routine_id.description,
    assigned_routine_id: id,
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/routineHistory`,
      routineHistoryPayload,
      { withCredentials: true }
    );

    console.log("Rutina finalizada registrada:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al registrar rutina finalizada:", error);
    throw error;
  }
};

export default SendExerciseDone;
