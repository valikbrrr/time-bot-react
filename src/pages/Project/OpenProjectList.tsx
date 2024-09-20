import { useDispatch, useSelector } from "react-redux";
import BackArrow from "../../assets/BackArrow";
import { useEffect, useState } from 'react';
import { selectProject } from "../../store/projectSlice";


const OpenProjectList = () => {
    const dispatch = useDispatch();
    const [projects, setProject] = useState([]);
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

    const handleProjectSelect = (project: string) => {
        console.log(`qqqqqqqqqqqq`);
        console.log(project);
        dispatch(selectProject(project));
    };

    return (
        <div className="">
            {selectedProject ? (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
                    <BackArrow lastPage={"/addhoursproject"} />
                    <div className="">fffffffff</div>
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