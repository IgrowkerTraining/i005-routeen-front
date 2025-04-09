import axios from '../../api/axiosInstance'
import { AuthTrainerInput, AuthTrainerResponse } from '../interfaces/auth'

const authTrainer = async (data: AuthTrainerInput): Promise<AuthTrainerResponse> => {
    const res = await axios.post<AuthTrainerResponse>('/auth/trainer', data, {
        withCredentials: true,
    });

    return res.data;
};

export default authTrainer;
