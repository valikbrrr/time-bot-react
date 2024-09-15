import { SetStateAction, useState } from "react";
import BackArrow from "../../assets/BackArrow";

const CreateNewProject = () => {
    const [projectName, setProjectName] = useState(""); // Состояние для имени проекта

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setProjectName(event.target.value); // Обновляем состояние при изменении ввода
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/create-project', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: projectName }),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
            }
    
            const data = await response.json();
            console.log("Ответ от сервера:", data);
    
            // Очистка поля ввода после успешной отправки
            setProjectName(""); 
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
            <BackArrow lastPage={"/addhoursproject"} />
            <div className="pt-8 px-[10%]">
                <div className="text-center text-white text-3xl mb-4">
                    Введите название нового проекта
                </div>
            </div>
            <div className="flex justify-center mb-40">
                <div className="w-[60%]">
                    <input 
                        className="w-full h-8 pt-1 pb-2 px-2 rounded-xl outline-none" 
                        type="text" 
                        placeholder="Введите название проекта..." 
                        value={projectName} // Привязываем значение
                        onChange={handleInputChange} // Обработка изменения
                    />
                    <button 
                        className="bg-blue-500 text-white rounded-xl p-2 w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={handleSubmit} // Обработка нажатия на кнопку
                    >
                        Создать проект
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewProject;