import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { MonthListComponents } from "../../components/MonthListComponent";
import { postViewHoursMonth } from "../../api/monthBranchApi/postViewHoursMonth";
import { fetchMonths } from "../../api/monthBranchApi/fetchMonths";


const ViewHoursMonth = () => {
  const tg = window.Telegram.WebApp;
  const [months, setMonths] = useState<string[]>([]);
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [selectedMonthView, setSelectedMonthView] = useState("");

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const data = await fetchMonths(); 
        setMonths(data);
      } catch (error) {
        console.error("Ошибка при получении данных о месяцах:", error);
      }
    };
  
    loadMonths();
  }, []);
  
  useEffect(() => {
    const fetchHours = async () => {
      if (!tg.initDataUnsafe.user) {
        return;
      }
  
      setLoading(true);
      setHours(0);
      setCurrentMonth(selectedMonthView);
  
      const userId = tg.initDataUnsafe.user.id;
  
      if (userId === 0) {
        console.error("Получен некорректный userId");
        setLoading(false);
        return;
      }
  
      try {
        const response = await postViewHoursMonth(userId, selectedMonthView)
  
        console.log(`data - ${response.data}`);
  
        if (response.data.hours !== undefined) {
          setHours(response.data.hours);
        } else {
          console.error("Данные о часах отсутствуют:", response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении данных о часах: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHours();
  }, [selectedMonthView, tg.initDataUnsafe.user]);

  const handleMonthSelectView = (month: string) => {
    setSelectedMonthView(month);
    setShowHours(true);
    setLoading(false);
  };

  return (
    <div className="">
      {showHours ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
          <BackArrow lastPage={constRouts.monthBranch} />
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center text-white text-2xl mb-4 px-5">
              {loading
                ? "идёт загрузка..."
                : hours === null
                ? `Данные ранее не были записаны`
                : `Ваши часы за ${currentMonth} - ${hours}`}
            </div>
          </div>
        </div>
      ) : (
        <MonthListComponents 
        months={months} 
        onMonthSelect={handleMonthSelectView} 
      />
      )}
    </div>
  );
};

export default ViewHoursMonth;
