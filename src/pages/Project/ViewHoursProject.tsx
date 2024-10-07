import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { ProjectListComponent } from "../../components/ProjectListComponent";
import axios from "axios";

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
        const response = await axios.get(`${url}/api/exist-projects`);
        setProject(response.data);
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
        const response = await axios.post(`${url}/api/view-hours-project`, {
          method: "POST",
          userId: userId.toString(),
          userSelectProject: selectedProjectView,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(`data - ${response.data}`);

        if (response.data.hours !== undefined) {
          setHours(response.data.hours);
        } else {
          console.error("Данные о часах отсутствуют:", response.data);
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
  };

  return (
    <div className="">
      {showHours ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
          <BackArrow lastPage={constRouts.projectBranch} />
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
        <ProjectListComponent
          loading={loading}
          projects={projects}
          onProjectSelect={handleProjectSelectView}
          backRout={constRouts.projectBranch}
        />
      )}
    </div>
  );
};

export default ViewHoursProject;
