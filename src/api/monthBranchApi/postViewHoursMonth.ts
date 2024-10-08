import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postViewHoursMonth = async (
  userId: number,
  selectedMonthView: string
) => {
  try {
    const response = await axios.post(
      `${url}/api/view-hours-month`,
      {
        selectedMonthView,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`response.data - ${response.data}`);

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};
