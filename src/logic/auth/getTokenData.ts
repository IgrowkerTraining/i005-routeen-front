import axios from '../../api/axiosInstance'

const authToken = async () => {
    const res = await axios.get('/auth/me', {
        withCredentials: true,
    })
    return res.data
}

export default authToken