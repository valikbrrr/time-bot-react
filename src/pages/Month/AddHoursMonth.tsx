import { useEffect, useState } from "react";
import BackArrow from "../../assets/BackArrow";
import React from "react";
import { constRouts } from "../../config/constRouts";
import { BackToHomepage } from "../../components/BackToHomepage";
import { Button } from "../../components/Button";
import { MonthListComponents } from "../../components/MonthListComponent";
import { fetchMonths } from "../../api/monthBranchApi/fetchMonths";
import { postAddHoursMonth } from "../../api/monthBranchApi/postAddHoursMonth";

const AddHoursMonth: React.FC = () => {
  const tg = window.Telegram.WebApp;
  const [months, setMonths] = useState<string[]>([]);
  const [hours, setHours] = useState<string>("");
  const [backToHomepage, setBackToHomepage] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  // зашел в прилку -> запрос на месяцы -> ставишь часы -> запрос на постановку часов -> !!!!!!рефетч месяцев и постановка их в стейт
  useEffect(() => {
    const loadMonths = async () => {
      try {
        const data = await fetchMonths();
        setMonths(data);
      } catch (error) {
        console.error("Ошибка при загрузке месяцев:", error);
      }
    };

    loadMonths();
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
      const response = await postAddHoursMonth(
        name,
        id,
        Number(hours),
        selectedMonth
      );

      console.log(`response - ${response}`);
      setHours("");
    } catch (error) {
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
              <Button variant="send" onClick={handleSubmit} disabled={!hours}>
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
