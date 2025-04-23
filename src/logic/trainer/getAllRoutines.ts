import axios from '../../api/axiosInstance'
//import { Routine } from '../interfaces/trainer'

const getAllRoutines = async () => {
    const res = await axios.get(`/routine`, {
        withCredentials: true,
    })
    return res.data
}

export default getAllRoutines 
