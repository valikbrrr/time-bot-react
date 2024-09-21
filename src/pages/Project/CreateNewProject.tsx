import { SetStateAction, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { useNavigate } from "react-router-dom";

const CreateNewProject = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [backToOpenProjectList, setBackToOpenProjectList] = useState<boolean>(false); 

    const handleSubmit = async () => {
        setBackToOpenProjectList(true)
        try {
            console.log(`projectName - ${projectName}`);
            
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/api/create-project`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { 
                    projectName: projectName 
                }
            ),
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при отправке данных');
        }
        
        const data = await response.json();
        console.log("Ответ от сервера:", data);
        
        setProjectName(""); 
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        const value = event.target.value
        setProjectName(value)
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
                            <button className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                                onClick={() => navigate("/openprojectlist")}>
                                Открыть список проектов
                            </button>
                            <button className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                                onClick={() => navigate("/")}>
                                Вернуться на главную страницу
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-center">
                <BackArrow lastPage={"/addhoursproject"} />
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