import axios from "axios";

const url = process.env.REACT_APP_API_URL;

type MonthResponse = string[];

export const fetchMonths = async (): Promise<MonthResponse> => {
  try {
    console.log(`work try`);
    const response = await axios.get<MonthResponse>(`${url}/api/current-month`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
