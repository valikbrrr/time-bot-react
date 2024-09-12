import { useEffect, useState } from 'react';
import BackArrow from '../../assets/BackArrow';

const AddHoursMonth = () => {
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState <number | null>(null); // Состояние для выбранного месяца

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

    // Функция для обработки нажатия на кнопку
    const handleButtonClick = (index: number) => {
        setSelectedMonth(index);
    };

    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
            <BackArrow lastPage={"/mouthbranch"} />
            <div className="pt-8 px-[10%]">
                <div className="text-center text-white text-3xl mb-4">Выберите ваш месяц</div>
            </div>
            <div className="flex justify-center mb-40">
                <div className="w-[70%]">
                    <div className="flex flex-col items-center">
                        
                        {months.map((month, index) => {
                            let selectedButton;
                            if (selectedMonth === index) {
                                selectedButton = index === 0 ? month : index === 1 ? month : month;
                                console.log(selectedButton);
                            }
                            // if (selectedMonth === index) {
                            //     selectedButton = 1
                            // }

                            return (
                                <button
                                    className={`bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                    key={index}
                                    onClick={() => handleButtonClick(index)} // Обработка нажатия
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHoursMonth;