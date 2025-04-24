
import axios from '../../api/axiosInstance'

const deleteAssignedRoutine = async (routineAssigned_id: string): Promise<{ message: string }> => {
    console.log('Deleting assigned routine with ID:', routineAssigned_id);

    if (!routineAssigned_id) {
        throw new Error('El ID de la rutina asignada es obligatorio');
    }

    const url = `/routineAssigned/${routineAssigned_id}`;
    console.log('Making DELETE request to:', import.meta.env.VITE_API_URL + url);

    try {
        const res = await axios.delete(url, {
            withCredentials: true,
        });

        console.log('Delete successful:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error deleting assigned routine:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        });
        throw error;
    }
}

export default deleteAssignedRoutine;
