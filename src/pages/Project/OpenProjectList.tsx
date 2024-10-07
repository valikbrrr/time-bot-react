import BackArrow from "../../assets/BackArrow";
import { useEffect, useState } from "react";
import { constRouts } from "../../config/constRouts";
import { BackToHomepage } from "../../components/BackToHomepage";
import { Button } from "../../components/Button";
import { ProjectListComponent } from "../../components/ProjectListComponent";

const url = process.env.REACT_APP_API_URL;

const OpenProjectList = () => {
  const tg = window.Telegram.WebApp;
  const [projects, setProject] = useState([]);
  const [hours, setHours] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [backToHomepage, setBackToHomepage] = useState<boolean>(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Устанавливаем состояние загрузки
      try {
        const url = process.env.REACT_APP_API_URL;
        const response = await fetch(`${url}/api/exist-projects`);
        const data = await response.json();
        setProject(data);
        console.log("work TRY");
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false); // Сбрасываем состояние загрузки
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/;

    if (regex.test(value) || value === "") {
      setHours(value);
    }
  };

  const handleSubmit = async () => {
    setBackToHomepage(true);
    if (!selectedProject) {
      console.log(`!selectedProject`);

      return;
    }
    try {
      console.log(`selectedProject front - ${selectedProject}`);

      const name =
        tg.initDataUnsafe.user?.username ||
        tg.initDataUnsafe.user?.first_name ||
        "неизвестный пользователь";
      const id = tg.initDataUnsafe.user?.id
        ? tg.initDataUnsafe.user?.id.toString()
        : "неизвестный id";
      const response = await fetch(`${url}/api/add-hours-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          userId: id,
          hoursInProject: Number(hours),
          selectedProject: selectedProject,
        }),
      });

      if (response.ok) {
        console.log("Данные успешно отправлены");
        setHours("");
      } else {
        console.log("Ошибка при отправке данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
    setShowInput(true);
    setLoading(false);
  };

  if (backToHomepage) {
    return <BackToHomepage />;
  }

  return (
    <div className="">
      {showInput ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
          <BackArrow lastPage={constRouts.projectBranch} />
          <div className="pt-20 px-[10%]">
            <div className="text-center text-white text-3xl mb-4">
              Введите количество часов
            </div>
          </div>
          <div className="text-white text-xl flex justify-center">
            <div className="text-center w-[70%]">
              Вы выбрали проект: {selectedProject}
              <input
                type="text"
                placeholder="Введите кол-во часов..."
                className="mt-4 p-2 rounded w-full outline-none text-black"
                value={hours}
                onChange={handleInputChange}
              />
              <Button variant="send" onClick={handleSubmit} disabled={!hours}>
                Отправить
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ProjectListComponent
          loading={loading}
          projects={projects}
          onProjectSelect={handleProjectSelect}
          backRout={constRouts.addHoursProject}
        />
      )}
    </div>
  );
};

export default OpenProjectList;
