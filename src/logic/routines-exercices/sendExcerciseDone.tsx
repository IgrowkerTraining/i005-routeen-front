import axios from "../../api/axiosInstance";

const SendExerciseDone = async (athleteId: string, routineId: string) => {

  try {
    const res = await axios.post(`athlete/${athleteId}/routineAssigned/${routineId}/exerciseHistory`,
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
