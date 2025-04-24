import axios from "../../api/axiosInstance"

const createRoutine = async (formData: FormData) => {
    const res = await axios.post("/routine", formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return res.data;
};

export default createRoutine;