import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <div className="pt-28 px-[10%]">
        <div className="text-center text-white text-3xl mb-3">
          Добро пожаловать!
        </div>
        <div className="text-center text-white text-2xl mb-4">
          Выберите формат ввода времени
        </div>
      </div>
      <div className="flex justify-center mb-40">
        <div className="w-[70%]">
          <div className="flex flex-col items-center">
            <button
              className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/month-branch")}
            >
              Учёт времени по месяцам
            </button>
            <button
              className="bg-blue-500 text-white rounded-xl p-3 w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/project-branch")}
            >
              Учёт времени по проектам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
