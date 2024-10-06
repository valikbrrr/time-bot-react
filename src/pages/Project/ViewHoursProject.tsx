import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";

const url = process.env.REACT_APP_API_URL;

const ViewHoursProject = () => {
  const tg = window.Telegram.WebApp;
  const [projects, setProject] = useState([]);
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [selectedProjectView, setSelectedProjectView] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/exist-projects`);
        const data = await response.json();
        setProject(data);
        console.log("work TRY");
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchHours = async () => {
      if (!selectedProjectView || !tg.initDataUnsafe.user) {
        return;
      }

      setLoading(true);
      setHours(0);
      setCurrentProject(selectedProjectView);

      const userId = tg.initDataUnsafe.user.id;

      if (userId === 0) {
        console.error("Получен некорректный userId");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${url}/api/view-hours-project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId.toString(),
            userSelectProject: selectedProjectView,
          }),
        });

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();
        console.log(`data - ${data}`);

        if (data.hours !== undefined) {
          setHours(data.hours);
        } else {
          console.error("Данные о часах отсутствуют:", data);
        }
      } catch (error) {
        console.error("Ошибка при получении данных о часах: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [selectedProjectView, tg.initDataUnsafe.user]);

  const handleProjectSelectView = (project: string) => {
    setSelectedProjectView(project);
    setShowHours(true);
    setLoading(false);
    // dispatch(selectProjectView(project));
  };

  return (
    <div className="">
      {showHours ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
          <BackArrow lastPage={"/projectbranch"} />
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center text-white text-2xl mb-4 px-5">
              {loading
                ? "идёт загрузка..."
                : hours === null
                ? `Данные ранее не были записаны`
                : `Ваши часы в проекте: "${currentProject}" - ${hours}`}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
          <BackArrow lastPage={"/projectbranch"} />
          <div className="pt-8 px-[10%]">
            <div className="text-center text-white text-3xl mb-4">
              Выберите проект для просмотра часов
            </div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <div className="flex flex-col items-center">
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <button
                      className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl"
                      key={index}
                      onClick={() => handleProjectSelectView(project)}
                    >
                      {project}
                    </button>
                  ))
                ) : (
                  <div className="text-white text-2xl">проекты ещё не были созданы</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHoursProject;
