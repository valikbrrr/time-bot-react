import BackArrow from "../../assets/BackArrow";
import { useEffect, useState } from 'react';

const OpenProjectList = () => {
    const [projects, setProject] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const response = await fetch('http://localhost:3001/api/exist-projects');
                const data = await response.json();
                setProject(data);
                console.log("work TRY");
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {
                setLoading(false); // Сбрасываем состояние загрузки
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
            <BackArrow lastPage={"/addhoursproject"} />
            <div className="pt-8 px-[10%]">
                <div className="text-center text-white text-3xl mb-4">
                    Открыть список проектов
                </div>
            </div>
            <div className="flex justify-center mb-40">
                <div className="w-[70%]">
                    <div className="grid grid-cols-2 gap-4"> {/* Изменено на grid с двумя колонками */}
                        {loading ? ( // Проверка состояния загрузки
                            <div className="text-white text-center">Загрузка проектов...</div>
                        ) : (
                            projects.map((project, index) => (
                                <button
                                    className='bg-blue-500 text-white rounded-xl p-3 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl' 
                                    key={index}
                                >
                                    {project}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenProjectList;