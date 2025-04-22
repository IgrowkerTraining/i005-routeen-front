import axios from "../../api/axiosInstance"

const assignRoutineToAthlete = async (formData: FormData) => {
    const res = await axios.post("/assign-routine", formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return res.data;
};

export default assignRoutineToAthlete;