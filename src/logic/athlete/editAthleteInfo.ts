import axios from '../../api/axiosInstance'

type AthleteData = {
  id: string
  name: string
  email: string
  phone: string
  date_birth: string
  goal?: string
  gender?: string
  height?: string
  weight?: string
  injuries?: string
  file?: File | null
}

const editAthleteInfo = async (data: AthleteData) => {
  const { id, file, ...updateFields } = data
  
  const formData = new FormData()
  Object.entries(updateFields).forEach(([key, value]) => {
    if (value != null) {
      formData.append(key, value)
    }
  })

  if (file) {
    formData.append('file', file)
  }

  const res = await axios.patch(`/athlete/${id}`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export default editAthleteInfo
