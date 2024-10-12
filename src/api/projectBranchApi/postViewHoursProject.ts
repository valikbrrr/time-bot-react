import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// Определите тип для ответа
interface ViewHoursResponse {
  hours: number;
}

export const postViewHoursProject = async (
  userId: number,
  userSelectProject: string
): Promise<ViewHoursResponse> => {
  try {
    console.log(`work try`);
    console.log(`selectedProjectView in post - ${userSelectProject}`);

    const response = await axios.post<ViewHoursResponse>(
      `${url}/api/view-hours-project`,
      {
        userId,
        userSelectProject,
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