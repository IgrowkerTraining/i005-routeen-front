import axios from '../../api/axiosInstance'
import { AuthAthleteInput, AuthAthleteResponse } from '../interfaces/auth'

const authAthlete = async (data: AuthAthleteInput): Promise<AuthAthleteResponse> => {
    try {
        const res = await axios.post<AuthAthleteResponse>('/auth/athlete', data, {
            withCredentials: true,
        })
        
        console.log('Login correcto:', res.data)

        return res.data
      } catch (error: any) {
        console.error(' Error al autenticar atleta:', error.message)
        throw error
      }
    }

export default authAthlete