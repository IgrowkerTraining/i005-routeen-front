
import axios from '../../api/axiosInstance';

const getOTP = async (athlete_id: string, trainer_id: string) => {
  const res = await axios.post(
    '/otp',
    { athlete_id, trainer_id },
    { withCredentials: true }
  );
  return res.data;
};

export default getOTP;
