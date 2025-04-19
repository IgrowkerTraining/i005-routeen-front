import axios from '../../api/axiosInstance'
import { TrainerBasic } from '../interfaces/trainer'

const getTrainerInfo = async (data: TrainerBasic) => {
    const { id } = data
    const res = await axios.get(`/trainer/${id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getTrainerInfo 
