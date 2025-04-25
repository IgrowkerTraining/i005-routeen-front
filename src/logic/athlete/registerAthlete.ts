import axios from '../../api/axiosInstance'
import { RegisterAthleteInput } from '../interfaces/athlete';

const registerAthlete = async (data: RegisterAthleteInput) => {
    const res = await axios.post('/trainer', data, {
        withCredentials: true,
    });

    return res.data;
};

export default registerAthlete;
