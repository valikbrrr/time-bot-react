import { useNavigate } from "react-router-dom"
import BackArrow from "../../assets/BackArrow"
import { constRouts } from "../../config/constRouts"

const AddHoursProject = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
          <BackArrow lastPage={constRouts.projectBranch} />
          <div className="pt-8 px-[10%]">
            <div className="text-center pt-8 text-white text-3xl mb-4">Что вы хотите сделать?</div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => navigate(constRouts.openProjectList)}
                  className='bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                >
                  Открыть список проектов
                </button>
                <button
                  onClick={() => navigate(constRouts.createNewProject)}
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