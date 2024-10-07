import { useNavigate } from "react-router-dom"
import { constRouts } from "../config/constRouts"


export const BackToHomepage = () => {
    const navigate = useNavigate()
    return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-center">
    <div className="pt-32 px-[10%]">
      <div className="text-center text-white text-3xl mb-8">
        Ваши часы записаны!
      </div>
    </div>
    <div className="flex justify-center mb-40">
      <div className="w-[70%]">
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => navigate(constRouts.homePage)}
          >
            Вернуться на главную страницу
          </button>
        </div>
      </div>
    </div>
  </div>
)}