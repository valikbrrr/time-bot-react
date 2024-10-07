import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { Button } from "../../components/Button";

const MonthBranch = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <BackArrow lastPage={constRouts.homePage} />
      <div className="pt-8 px-[10%]">
        <div className="text-center text-white text-3xl mb-4">
          Вы можете добавить или просмотреть часы😊
        </div>
      </div>
      <div className="flex justify-center mb-40">
        <div className="w-[70%]">
          <div className="flex flex-col items-center">
            <Button
              variant="buttonMenu"
              onClick={() => navigate(constRouts.addHoursMonth)}
              className="mb-4"
            >
              Добавить часы за месяц
            </Button>
            <Button
              variant="buttonMenu"
              onClick={() => navigate(constRouts.viewHoursMonth)}
            >
              Посмотреть ранее введённые часы за месяц
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthBranch;
