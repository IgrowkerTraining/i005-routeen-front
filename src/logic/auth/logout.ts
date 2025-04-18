import axios from '../../api/axiosInstance'

const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    )
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

export default logoutUser
