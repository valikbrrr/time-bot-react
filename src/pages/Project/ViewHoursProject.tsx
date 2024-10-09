import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { ProjectListComponent } from "../../components/ProjectListComponent";
import { fetchProjects } from "../../api/projectBranchApi/fetchProjects";
import { postViewHoursProject } from "../../api/projectBranchApi/postViewHoursProject";

const ViewHoursProject = () => {
  const tg = window.Telegram.WebApp;
  const [projects, setProject] = useState([]);
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [selectedProjectView, setSelectedProjectView] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProject(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    console.log("work useEf");

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
        console.log(`userId - ${userId}`);
        console.log(`selectedProjectView - ${selectedProjectView}`);

        if (selectedProjectView) {
          const data = await postViewHoursProject(userId, selectedProjectView);

          if (data.hours !== undefined) {
            setHours(data.hours);
          } else {
            console.error("Данные о часах отсутствуют:", data);
          }
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
