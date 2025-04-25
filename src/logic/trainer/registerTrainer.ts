import axios from '../../api/axiosInstance'

const registerTrainer = async (formData: FormData) => {
    //ver que datos se envían al servidor
    try {
        console.log('Datos que se envían al servidor:')
        for (const [key, value] of formData.entries()) {
            if (key === 'file') {
                console.log('file:', (value as File).name, (value as File).type, (value as File).size)
            } else {
                console.log(`${key}:`, value)
            }
        }

        const res = await axios.post('/trainer', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return res.data
    } catch (error: any) {
        console.error('Error detallado:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        })
        throw error
    }
}

export default registerTrainer
