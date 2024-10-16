import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postCreateNewProject = async (projectName: string) => {
  console.log(`POST projectName - ${projectName}`);

  try {
    const response = await axios.post(
      `${url}/api/create-project`,
      {
        projectName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};
