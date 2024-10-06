import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";

const ProjectBranch = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <BackArrow lastPage={constRouts.homePage} />
      <div className="pt-8 px-[10%]">
        <div className="text-center text-white text-3xl mb-4">Вы можете добавить или просмотреть часы😊</div>
      </div>
      <div className="flex justify-center mb-40"> 
        <div className="w-[70%]"> 
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate(constRouts.addHoursProject)}
              className='bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl'
            >
              Добавить часы в проект
            </button>
            <button
              onClick={() => navigate(constRouts.viewHoursProject)}
              className='bg-blue-500 text-white rounded-xl p-3 w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl'
            >
              Посмотреть ранее введённые часы в проекте
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBranch;