import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const fetchMonths = async () => {
  try {
    const response = await axios.get(`${url}/api/current-month`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

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

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};

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

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    throw error;
  }
};

// review
