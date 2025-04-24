import axios from '../../api/axiosInstance'

type AthleteData = {
  id: string
  name: string
  email: string
  phone: string
  date_birth: string
  goal?: string
  gender?: string
  hight?: string
  weight?: string
  injuries?: string
}

const editAthleteInfo = async (data: AthleteData) => {
  const { id, ...updateFields } = data

  const res = await axios.patch(`/athlete/${id}`, updateFields, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export default editAthleteInfo
