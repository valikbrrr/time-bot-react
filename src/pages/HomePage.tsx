import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden">
      <div className="my-10">
        <div className="text-center pt-8 text-4xl mb-4">Добро пожаловать!</div>
        <div className="text-center text-3xl mb-20 w-full">Выберите формат ввода времени</div>
        <div className="flex">
          <div className="w-[70%] mx-[15%]">
            <div className="flex flex-col items-center pt-5">
              <button
                className='bg-emerald-600 rounded-xl p-2 w-full mb-4'
                onClick={() => navigate("/mouthbranch")}
              >
                Учёт времени по месяцам
              </button>
              <button
                className='bg-emerald-600 rounded-xl p-2 w-full'
                onClick={() => navigate("/projectbranch")} // Добавьте навигацию, если нужно
              >
                Учёт времени по проектам
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;