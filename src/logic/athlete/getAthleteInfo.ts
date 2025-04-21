import axios from '../../api/axiosInstance'

const getAthleteInfo = async (data: { id: string }) => {
  const { id } = data
  const res = await axios.get(`/athlete/${id}`, {
    withCredentials: true,
  })
  return res.data
}

export default getAthleteInfo
