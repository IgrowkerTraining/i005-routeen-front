import axios from '../../api/axiosInstance'
import { TrainerGetStudent } from '../interfaces/trainer'

const getAthleteById = async (data: TrainerGetStudent) => {
    const { trainer_id, athlete_id } = data
    const res = await axios.get(`/trainer/${trainer_id}/athletes/${athlete_id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getAthleteById