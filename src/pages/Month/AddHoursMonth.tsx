// src/components/AddHoursMonth.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../store/monthSlice';
import BackArrow from '../../assets/BackArrow';
import React from 'react';

const AddHoursMonth: React.FC = () => {
    const dispatch = useDispatch();
    const [months, setMonths] = useState<string[]>([]);
    const [hours, setHours] = useState<string>('');
    const selectedMonth = useSelector((state: any) => state.month.selectedMonth); 

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/current-month');
                const data = await response.json();
                setMonths(data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchMonths();
    }, []);

    const handleMonthSelect = (month: string) => {
        dispatch(selectMonth(month));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^(?:[1-9][0-9]{0,2}|[1-7][0-4][0-4]?)$/;

        if (regex.test(value) || value === '') {
            setHours(value);
        }
    };

    const handleSubmit = async () => {
        if (!selectedMonth || !hours) return;

        try {
            const response = await fetch('http://localhost:3001/api/submit-hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month: selectedMonth,
                    hours: Number(hours),
                }),
            });

            if (response.ok) {
                alert('Данные успешно отправлены');
                setHours(''); // Очистить поле ввода после успешной отправки
            } else {
                alert('Ошибка при отправке данных');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <div className="">
            {selectedMonth ? (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
                    <BackArrow lastPage={"/mouthbranch"} />
                    <div className="pt-8 px-[10%]">
                        <div className="text-center text-white text-3xl mb-4">Введите количество часов</div>
                    </div>
                    <div className="text-white text-xl flex justify-center">
                        <div className="text-center w-[70%]">
                            Вы выбрали месяц: {selectedMonth}
                            <input  
                            type="text" 
                            placeholder="Введите кол-во часов..." 
                            className="mt-4 p-2 rounded w-full outline-none text-black"
                            value={hours}
                            onChange={handleInputChange}
                            />
                            <button
                            className="mt-4 bg-green-500 text-white rounded p-2 transition duration-300 ease-in-out hover:bg-green-600 w-full outline-none"
                            onClick={handleSubmit}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
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
                                        className="bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        key={index}
                                        onClick={() => handleMonthSelect(month)}
                                    >
                                        {month}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default AddHoursMonth;