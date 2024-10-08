import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postAddHoursMonth = async (
  userName: string,
  userId: string,
  hours: number,
  selectedMonth: string
) => {
  try {
    const response = await axios.post(
      `${url}/api/add-hours-month`,
      {
        userName,
        userId,
        hoursInMonth: hours,
        selectedMonth,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};
