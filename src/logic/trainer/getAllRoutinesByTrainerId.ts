import axios from '../../api/axiosInstance'

const getAllRoutinesByTrainerId = async (trainerId: string) => {
  const res = await axios.get(`/trainer/${trainerId}/routines`, {
    withCredentials: true,
  })
  return res.data.routines
}

export default getAllRoutinesByTrainerId
