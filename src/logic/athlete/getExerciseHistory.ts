import axios from '../../api/axiosInstance'
const getExerciseHistory = async (athleteId: string) => {
  try {
    const response = await axios.get(`/athlete/${athleteId}/exerciseHistory`, {
      withCredentials: true,
    })
    console.log('Historial de ejercicios:', response.data)
    return response.data
  } catch (error) {
    console.error('Error al obtener el historial de ejercicios:', error)
  }
}

export default getExerciseHistory
