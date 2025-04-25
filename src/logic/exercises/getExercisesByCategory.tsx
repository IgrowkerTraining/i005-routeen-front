import axios from "../../api/axiosInstance"


const getExercisesByCategory = async (categoryId: string) => {
    const res = await axios.get("/exercise",   {
        withCredentials: true,
        params: { category_id: categoryId },

    
       
    });

    return res.data;
};

export default getExercisesByCategory