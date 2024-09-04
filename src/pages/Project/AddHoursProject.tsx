import { useNavigate } from "react-router-dom"

const AddHoursProject = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
          <div className="pt-28 px-[10%]">
            <div className="text-center pt-8 text-white text-4xl mb-4">Что вы хотите сделать?</div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => navigate("/openprojectlist")}
                  className='bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                >
                  Открыть список проектов
                </button>
                <button
                  onClick={() => navigate("/createnewproject")}
                  className='bg-blue-500 text-white rounded-xl p-3 w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                >
                  создать новый проект
                </button>
              </div>
            </div>
          </div>
      </div>
    )
}

export default AddHoursProject