import axios from '../../api/axiosInstance'

type updateTrainerProps = {
  id: string;
  data: FormData;
}

const updateTrainer = async ({ id, data }: updateTrainerProps) => {
  const res = await axios.patch(`/trainer/${id}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (formData) => formData,
  })
  return res.data
}

export default updateTrainer