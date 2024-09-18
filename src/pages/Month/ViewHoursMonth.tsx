import { useEffect, useState } from 'react';
import BackArrow from '../../assets/BackArrow';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthView } from '../../store/monthViewSlice';

const ViewHoursMonth = () => {
    const tg = window.Telegram.WebApp;
    const dispatch = useDispatch();
    const [months, setMonths] = useState([]);
    const [hours, setHours] = useState(0);
    const [id, setId] = useState<number>(0);
    const [hasFetchedHours, setHasFetchedHours] = useState(false);
    const selectedMonthView = useSelector((state: any) => state.monthView.selectedMonthView);

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/current-month');
                const data = await response.json();
                setMonths(data);
            } catch (error) {
                console.error('Ошибка при получении данных о месяцах:', error);
            }
        };

        fetchMonths();
    }, []);

    useEffect(() => {
        const fetchHours = async () => {
            if (hasFetchedHours || !selectedMonthView || !tg.initDataUnsafe.user) {
                return;
            }

            const userId = tg.initDataUnsafe.user.id;

            if (userId === 0) {
                console.error('Получен некорректный userId');
                return;
            }

            console.log(`selectedMonthView - ${selectedMonthView}`);

            try {
                const response = await fetch('http://localhost:3001/api/view-hours-month', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId.toString(), // Приведение к строке
                        userSelectMonth: selectedMonthView,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сети: ${response.status}`);
                }

                const data = await response.json();
                console.log(`id front - ${userId}`, data);

                if (data.hours !== undefined) {
                    setHours(data.hours);
                    setId(userId);
                    setHasFetchedHours(true);
                } else {
                    console.error('Данные о часах отсутствуют:', data);
                }
            } catch (error) {
                console.error('Ошибка при получении данных о часах: ', error);
            }
        };

        fetchHours();
    }, [selectedMonthView, tg.initDataUnsafe.user, hasFetchedHours]);

    const handleMonthSelectView = (month: string) => {
        dispatch(selectMonthView(month));
    };

    return (
        <div className="">
            {selectedMonthView ? (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
                    <BackArrow lastPage={"/mouthbranch"} />
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center text-white text-3xl mb-4">
                            Ваши часы за {selectedMonthView} - "{hours}" и ид - "{id}"
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
                    <BackArrow lastPage={"/mouthbranch"} />
                    <div className="pt-8 px-[10%]">
                        <div className="text-center text-white text-3xl mb-4">
                            Выберите месяц для просмотра часов
                        </div>
                    </div>
                    <div className="flex justify-center mb-40">
                        <div className="w-[70%]">
                            <div className="flex flex-col items-center">
                                {months.map((month, index) => (
                                    <button
                                        className={`bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl`}
                                        key={index}
                                        onClick={() => handleMonthSelectView(month)}
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

export default ViewHoursMonth;