import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { Button } from "../../components/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { selectMonthView } from "../../store/monthViewSlice";

const url = process.env.REACT_APP_API_URL;

const ViewHoursMonth = () => {
  const tg = window.Telegram.WebApp;
  const [months, setMonths] = useState([]);
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [selectedMonthView, setSelectedMonthView] = useState("");

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch(`${url}/api/current-month`);
        const data = await response.json();
        setMonths(data);
      } catch (error) {
        console.error("Ошибка при получении данных о месяцах:", error);
      }
    };

    fetchMonths();
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
        const response = await fetch(`${url}/api/view-hours-month`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
          console.error("Данные о часах отсутствуют:", data);
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
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
          <BackArrow lastPage={constRouts.monthBranch} />
          <div className="pt-8 px-[10%]">
            <div className="text-center text-white text-3xl mb-4">
              Выберите месяц для просмотра часов
            </div>
          </div>
          <div className="flex justify-center mb-40">
            <div className="w-[70%]">
              <div className="flex flex-col items-center">
                {months.map((month, index) => (
                  <Button
                    key={index}
                    variant="forMonth"
                    onClick={() => handleMonthSelectView(month)}
                  >
                    {month}
                  </Button>
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
