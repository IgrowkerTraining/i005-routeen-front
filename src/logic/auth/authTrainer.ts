import axios from '../../api/axiosInstance'
import { AuthTrainerInput, AuthTrainerResponse } from '../interfaces/auth'

const authTrainer = async (data: AuthTrainerInput): Promise<AuthTrainerResponse> => {
    try {
        const res = await axios.post<AuthTrainerResponse>('/auth/trainer', data, {
            withCredentials: true,
        })
        
        console.log('Login correcto:', res.data)

        return res.data
    } catch (error: any) {
        console.error(' Error al autenticar entrenador:', error.message)
        throw error
    }
}

export default authTrainer
