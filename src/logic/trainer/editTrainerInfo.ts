// logic/trainer/editTrainerInfo.ts
import axios from '../../api/axiosInstance'

type TrainerData = {
  id: string
  name: string
  email: string
  phone: string
  date_birth: string
  file?: File | null
}

const editTrainerInfo = async (data: TrainerData) => {
  const { id, file, ...fields } = data

  const updateFields = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    updateFields.append(key, value)
  })

  if (file) {
    updateFields.append('file', file)
  }

  const res = await axios.patch(`/trainer/${id}`, updateFields, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export default editTrainerInfo
