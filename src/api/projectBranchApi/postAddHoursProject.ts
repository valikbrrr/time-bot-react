import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postAddHoursProject = async (
  userName: string,
  userId: string,
  hours: number,
  selectedProject: string
) => {
  try {
    const response = await axios.post(
      `${url}/api/add-hours-project`,
      {
        userName,
        userId,
        hoursInProject: hours,
        selectedProject,
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
