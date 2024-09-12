import { useEffect, useState } from 'react';
import BackArrow from '../../assets/BackArrow';

const AddHoursMonth = () => {
    console.log("work AddHoursMonth");
    const [months, setMonths] = useState([]);

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/current-month');
                const data = await response.json();
                setMonths(data);
                console.log("work TRY");
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchMonths();
    }, []);

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
            <BackArrow lastPage={"/mouthbranch"} />
            <div className="pt-8 px-[10%]">
                <div className="text-center text-white text-3xl mb-4">Выберите ваш месяц</div>
            </div>
            <div className="flex justify-center mb-40">
                <div className="w-[70%]">
                    <div className="flex flex-col items-center">
                    {months.map((month, index) => (
                        <button
                        className='bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl' key={index}
                        >
                        {month}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHoursMonth;

