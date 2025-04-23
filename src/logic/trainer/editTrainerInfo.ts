// logic/trainer/editTrainerInfo.ts
import axios from '../../api/axiosInstance'

type TrainerData = {
  id: string
  name: string
  email: string
  phone: string
  date_birth: string
}

const editTrainerInfo = async (data: TrainerData) => {
  const { id, ...updateFields } = data

  const res = await axios.patch(`/trainer/${id}`, updateFields, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res.data
}

export default editTrainerInfo
