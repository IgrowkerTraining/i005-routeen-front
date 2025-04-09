import axios from '../../api/axiosInstance'
import { AuthAthleteInput, AuthTrainerResponse } from '../interfaces/auth'

const authAthlete = async (data: AuthAthleteInput): Promise<AuthTrainerResponse> => {
    const res = await axios.post<AuthTrainerResponse>('/auth/athlete', data)
    return res.data
}

export default authAthlete