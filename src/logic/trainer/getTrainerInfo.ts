import axios from '../../api/axiosInstance'
import { TrainerId } from '../interfaces/trainer'

const getTrainerInfo = async (data: TrainerId) => {
    const { trainer_id } = data
    const res = await axios.get(`/trainer/${trainer_id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getTrainerInfo 
