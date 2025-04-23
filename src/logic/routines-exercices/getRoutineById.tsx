import axios from "../../api/axiosInstance";

const getRoutineById = async (id: string)=> {
  const res = await axios.get(`/routine/${id}`, {
    withCredentials: true,
  });
  console.log(res.data)
  return res.data;
};

export default getRoutineById;
