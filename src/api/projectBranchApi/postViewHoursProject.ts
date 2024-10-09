import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postViewHoursProject = async (
  userId: number,
  userSelectProject: string
) => {
  try {
    console.log(`work try`);
    console.log(`selectedProjectView in post - ${userSelectProject}`);

    const response = await axios.post(
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
