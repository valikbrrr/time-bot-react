import { useEffect, useState } from 'react';
import BackArrow from '../../assets/BackArrow';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthView } from '../../store/monthViewSlice';

const ViewHoursMonth = () => {
    const tg = window.Telegram.WebApp 
    
    const dispatch = useDispatch();
    const [months, setMonths] = useState([]);
    const [hours, setHours] = useState(0);
    const [id, setId] = useState(Number)
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
            console.log(`selectedMonthView - ${selectedMonthView}`);
            console.log(tg.initDataUnsafe.user);
            
            
            if (selectedMonthView && tg.initDataUnsafe.user) {
                try {
                    // console.log(`work1`);
                    setId(tg.initDataUnsafe.user.id)
                    // console.log(`work2`);
                    const response = await fetch('http://localhost:3001/api/view-hours-month', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        
                        body: JSON.stringify({
                            userId: id,
                            userSelectMonth: selectedMonthView,
                        }),
                    });

                    const data = await response.json();
                    console.log(`id front - ${id}`);
                    
                    setHours(data.hours);
                } catch (error) {
                    console.error('Ошибка при получении данных о часах: ', error);
                }
            } else {
                console.log(`вероятно ошикбка связана с тем, что мы не можем распознать ваш id или вы не выбрали месяц`);
            }
        };

        fetchHours();
    }, [id, selectedMonthView, tg.initDataUnsafe, tg.initDataUnsafe.user]);

    const handleMonthSelectView = (month: string) => {
        dispatch(selectMonthView(month));
    };

    const a = tg.initDataUnsafe.user

    return (
        <div className="">
            {selectedMonthView ? (
                <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
                    <BackArrow lastPage={"/mouthbranch"} />
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center text-white text-3xl mb-4">
                            Ваши часы за {selectedMonthView} - "{hours}" 
                            и ид - "{id}""
                            и - "{a}"
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