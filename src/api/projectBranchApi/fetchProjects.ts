import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const fetchProjects = async () => {
  try {
    console.log(`work try`);
    
    const response = await axios.get(`${url}/api/exist-projects`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};