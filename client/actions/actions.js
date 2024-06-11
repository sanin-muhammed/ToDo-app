import axios from "../config/axiosConfig";

export const all_tasks = async () => {
    try {
        const response = await axios.get("/tasks");
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const add_task = async (formData) => {
    try {
        const response = await axios.post("/tasks", formData);
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const update_task = async (id, formData) => {
    try {
        const response = await axios.put(`/tasks/${id}`, formData);
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const delete_task = async (id) => {
    try {
        const response = await axios.delete(`/tasks/${id}`);
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
