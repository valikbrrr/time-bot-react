import { SetStateAction, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { useNavigate } from "react-router-dom";
import { constRouts } from "../../config/constRouts";
import { Button } from "../../components/Button";
import { postCreateNewProject } from "../../api/projectBranchApi";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [backToOpenProjectList, setBackToOpenProjectList] =
    useState<boolean>(false);

  const handleSubmit = async () => {
    setBackToOpenProjectList(true);
    try {
      console.log(`projectName - ${projectName}`);

      const response = await postCreateNewProject((projectName))

      console.log("Ответ от сервера:", response.data);

      setProjectName("");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const value = event.target.value;
    setProjectName(value);
  };

  return (
    <div className="">
      {backToOpenProjectList ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-center">
          <div className="pt-32 px-[10%]">
            <div className="text-center text-white text-3xl mb-8">
              Ваш проект создан!
            </div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <div className="flex flex-col justify-between">
                <Button
                  variant="buttonMenu"
                  onClick={() => navigate(constRouts.openProjectList)}
                  className="mb-4"
                >
                  Открыть список проектов
                </Button>
                <Button
                  variant="buttonMenu"
                  onClick={() => navigate(constRouts.homePage)}
                >
                  Вернуться на главную страницу
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-center">
          <BackArrow lastPage={constRouts.addHoursProject} />
          <div className="pt-8 px-[10%]">
            <div className="text-center text-white text-3xl mb-8">
              Введите название нового проекта
            </div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <input
                className="mt-4 p-2 rounded w-full outline-none text-black"
                type="text"
                placeholder="Введите название проекта..."
                value={projectName}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 text-white rounded-xl p-2 w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleSubmit}
                disabled={!projectName}
              >
                Создать проект
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewProject;
