import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const postViewHoursMonth = async (
  userId: number,
  selectedMonthView: string
) => {
  try {
    console.log(`work try`);
    console.log(`selectedMonthView in post - ${selectedMonthView}`);
    
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
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};
