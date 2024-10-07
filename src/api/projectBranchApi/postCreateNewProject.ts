import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postCreateNewProject = async (projectName: string) => {
    try {
      const response = await axios.post(
        `${url}/api/view-hours-project`,
        {
          projectName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      throw error;
    }
  };