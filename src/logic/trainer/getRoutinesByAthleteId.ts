import axios from '../../api/axiosInstance'
import { RoutineAssigned } from '../interfaces/trainer'

interface RoutinesAssignedResponse {
    routinesAssigned: RoutineAssigned[]
}

const getRoutinesByAthleteId = async (athlete_id: string): Promise<RoutinesAssignedResponse> => {
    console.log('Fetching routines for athlete:', athlete_id);
    try {
        const url = `/athlete/${athlete_id}/routineAssigned`;
        console.log('Making request to:', import.meta.env.VITE_API_URL + url);

        const res = await axios.get(url, {
            withCredentials: true,
        });

        console.log('Response received:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        throw error;
    }
}

export default getRoutinesByAthleteId