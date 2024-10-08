import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postViewHoursMonth = async (
  userId: number,
  userSelectMonth: string
) => {
  try {
    console.log(`work try`);
    console.log(`selectedMonthView in post - ${userSelectMonth}`);

    const response = await axios.post(
      `${url}/api/view-hours-month`,
      {
        userSelectMonth,
        userId,
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
