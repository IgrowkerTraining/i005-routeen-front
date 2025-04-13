import axios from '../../api/axiosInstance'

interface TokenData {
  role: 'trainer' | 'athlete'
  name: string
}

const getTokenData = async (): Promise<TokenData | null> => {
  try {
    const res = await axios.get('/auth/me', {
      withCredentials: true,
    })

    const role = res.data?.user?.role
    const name = res.data?.user?.name

    if (!role) {
      console.log('No se recibió un rol válido del servidor')
      return null
    }

    return { role, name }
  } catch (error: any) {
    console.error('No hay sesión activa')
    return null
  }
}

export default getTokenData
