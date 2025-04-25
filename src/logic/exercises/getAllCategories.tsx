import axios from "../../api/axiosInstance"

const getAllCategories = async () => {
    const res = await axios.get("/category", {
        withCredentials: true,
       
    });

    return res.data;
};

export default getAllCategories;