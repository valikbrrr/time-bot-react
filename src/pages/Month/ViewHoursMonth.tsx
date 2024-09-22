import { useEffect, useState } from 'react';
import BackArrow from '../../assets/BackArrow';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthView } from '../../store/monthViewSlice';

const url = process.env.REACT_APP_API_URL;

const ViewHoursMonth = () => {
    const tg = window.Telegram.WebApp;
    const dispatch = useDispatch();
    const [months, setMonths] = useState([]);
    const [hours, setHours] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState('');
    const selectedMonthView = useSelector((state: any) => state.monthView.selectedMonthView);
    
    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const response = await fetch(`${url}/api/current-month`);
                const data = await response.json();
                setMonths(data);
            } catch (error) {
                console.error('Ошибка при получении данных о месяцах:', error);
            }
        };

        fetchMonths();
    }, []);

    useEffect(() => {
        setHours(0);
        dispatch(selectMonthView(''));
        setLoading(false);
    }, [dispatch]);


    useEffect(() => {
        const fetchHours = async () => {
            if (!selectedMonthView || !tg.initDataUnsafe.user) {
                return;
            }

            setLoading(true);
            setHours(0); 
            setCurrentMonth(selectedMonthView); 

            const userId = tg.initDataUnsafe.user.id;

            if (userId === 0) {
                console.error('Получен некорректный userId');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${url}/api/view-hours-month`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId.toString(),
                        userSelectMonth: selectedMonthView,
                    }),
                });

                if (!response.ok) {
                    console.log(`!response.ok`);
                    throw new Error(`Ошибка сети: ${response.status}`);
                }

                const data = await response.json();
                console.log(`data - ${data}`);
                
                if (data.hours !== undefined) {
                    setHours(data.hours);
                } else {
                    console.error('Данные о часах отсутствуют:', data);
                }
            } catch (error) {
                console.error('Ошибка при получении данных о часах: ', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchHours();
    }, [selectedMonthView, tg.initDataUnsafe.user]);

    const handleMonthSelectView = (month: string) => {
        dispatch(selectMonthView(month));
    };

    return (
        <div className="">
            {selectedMonthView ? (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
                    <BackArrow lastPage={"/mouthbranch"} />
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center text-white text-2xl mb-4 px-5">
                            {loading ? (
                                "идёт загрузка..."
                            ) : (
                                hours === null ? (
                                    `Данные ранее не были записаны`
                                ) : (
                                    `Ваши часы за ${currentMonth} - ${hours}`
                                )
                            )}
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