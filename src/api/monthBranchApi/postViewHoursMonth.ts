import axios from "axios";

const url = process.env.REACT_APP_API_URL;

interface ViewHoursResponse {
  hours: number;
}

export const postViewHoursMonth = async (
  userId: number,
  userSelectMonth: string
): Promise<ViewHoursResponse> => { 
  try {
    console.log(`work try`);
    console.log(`selectedMonthView in post - ${userSelectMonth}`);

    const response = await axios.post<ViewHoursResponse>(
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
