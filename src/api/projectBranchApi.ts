import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${url}/api/exist-projects`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

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

export const postViewHoursProject = async (
  userId: number,
  selectedProjectView: string
) => {
  try {
    const response = await axios.post(
      `${url}/api/view-hours-project`,
      {
        selectedProjectView,
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

export const postCreateNewProject = async (projectName: string) => {
  try {
    const response = await axios.post(
      `${url}/api/view-hours-project`,
      {
        projectName,
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
