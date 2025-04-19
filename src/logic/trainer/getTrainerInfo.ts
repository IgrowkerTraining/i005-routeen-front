import axios from '../../api/axiosInstance'

const getTrainerInfo = async (data: { id: string }) => {
    const { id } = data
    const res = await axios.get(`/trainer/${id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getTrainerInfo 
