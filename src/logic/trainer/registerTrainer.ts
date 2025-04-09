import axios from '../../api/axiosInstance'
import { RegisterTrainerInput } from '../interfaces/trainer'

const registerTrainer = async (data: RegisterTrainerInput) => {
    const res = await axios.post('/trainer', data, {
        withCredentials: true,
    });

    return res.data;
};

export default registerTrainer;
