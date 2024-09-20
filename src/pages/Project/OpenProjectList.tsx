import { useDispatch, useSelector } from "react-redux";
import BackArrow from "../../assets/BackArrow";
import { useEffect, useState } from 'react';
import { selectProject } from "../../store/projectSlice";


const OpenProjectList = () => {
    const dispatch = useDispatch();
    const [projects, setProject] = useState([]);
    const [hours, setHours] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const selectedProject = useSelector((state: any) => state.project.selectedProject);
    
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const url = process.env.REACT_APP_API_URL;
                const response = await fetch(`${url}/api/exist-projects`);
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

    useEffect(() => {
        setHours('');
        dispatch(selectProject(''));
    }, [dispatch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/;
        
        if (regex.test(value) || value === '') {
            setHours(value);
        }
    };

    const handleProjectSelect = (project: string) => {
        dispatch(selectProject(project));
    };

    return (
        <div className="">
            {selectedProject ? (
                 <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
                 <BackArrow lastPage={"/mouthbranch"} />
                 <div className="pt-20 px-[10%]">
                     <div className="text-center text-white text-3xl mb-4">Введите количество часов</div>
                 </div>
                 <div className="text-white text-xl flex justify-center">
                     <div className="text-center w-[70%]">
                         Вы выбрали проект: {selectedProject}
                         <input  
                         type="text" 
                         placeholder="Введите кол-во часов..." 
                         className="mt-4 p-2 rounded w-full outline-none text-black"
                         value={hours}
                         onChange={handleInputChange}
                         />
                         <button
                         className="mt-4 bg-green-500 text-white rounded p-2 transition duration-300 ease-in-out hover:bg-green-600 w-full outline-none"
                        //  onClick={handleSubmit}
                         >
                             Отправить
                         </button>
                     </div>
                 </div>
             </div>
            ) : (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
                <BackArrow lastPage={"/addhoursproject"} />
                <div className="pt-8 px-[10%]">
                    <div className="text-center text-white text-3xl mb-4">
                        Открыть список проектов
                    </div>
                </div>
                <div className="flex justify-center mb-40">
                    <div className="w-[70%]">
                        <div className="flex flex-col items-center"> 
                            {loading ? ( 
                                <div className="text-white text-center">Загрузка проектов...</div>
                            ) : (
                                projects.map((project, index) => (
                                    <button
                                        className='bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl' 
                                        key={index}
                                        onClick={() => {handleProjectSelect(project)}}
                                    >
                                        {project}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default OpenProjectList;