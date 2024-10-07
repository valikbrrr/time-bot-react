import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import React from "react";
import { constRouts } from "../../config/constRouts";
import { BackToHomepage } from "../../components/BackToHomepage";
import { Button } from "../../components/Button";
import { MonthListComponents } from "../../components/MonthListComponent";
import axios from "axios";

console.log(`url - ${process.env.REACT_APP_API_URL}`);
const url = process.env.REACT_APP_API_URL;

const AddHoursMonth: React.FC = () => {
  const tg = window.Telegram.WebApp;
  const [months, setMonths] = useState<string[]>([]);
  const [hours, setHours] = useState<string>("");
  const [backToHomepage, setBackToHomepage] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get(`${url}/api/current-month`); // Используйте axios для GET-запроса
        setMonths(response.data); // Доступ к данным через response.data
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
  
    fetchMonths();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/;

    if (regex.test(value) || value === "") {
      setHours(value);
    }
  };

  const handleSubmit = async () => {
    setBackToHomepage(true);

    try {
      const name =
        tg.initDataUnsafe.user?.username ||
        tg.initDataUnsafe.user?.first_name ||
        "неизвестный пользователь";
      const id = tg.initDataUnsafe.user?.id
        ? tg.initDataUnsafe.user?.id.toString()
        : "неизвестный id";
      console.log("work try");
      const response = await fetch(`${url}/api/add-hours-month`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          userId: id,
          hoursInMonth: Number(hours),
          selectedMonth: selectedMonth,
        }),
      });

      console.log(`response - ${await response.json()}`);

      if (response.ok) {
        console.log("Данные успешно отправлены");
        setHours("");
      } else {
        console.log("Ошибка при отправке данных");
      }
    } catch (error) {
      console.log("work try");
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowInput(true);
  };

  if (backToHomepage) {
    return <BackToHomepage />;
  }

  return (
    <div className="">
      {showInput ? (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col">
          <BackArrow lastPage={constRouts.monthBranch} />
          <div className="pt-20 px-[10%]">
            <div className="text-center text-white text-3xl mb-4">
              Введите количество часов
            </div>
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
              <Button
                variant="send"
                onClick={handleSubmit}
                disabled={!hours}
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <MonthListComponents 
        months={months} 
        onMonthSelect={handleMonthSelect} 
      />
      )}
    </div>
  );
};

export default AddHoursMonth;
