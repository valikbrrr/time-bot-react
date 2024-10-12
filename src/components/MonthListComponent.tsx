import BackArrow from "../assets/BackArrow";
import { constRouts } from "../config/constRouts";
import { Button } from "./Button";

interface MonthListComponentsProps {
  months: string[];
  onMonthSelect: (month: string) => void;
}

export const MonthListComponents: React.FC<MonthListComponentsProps> = ({
  months,
  onMonthSelect,
}) => {
  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <BackArrow lastPage={constRouts.monthBranch} />
      <div className="pt-8 px-[10%]">
        <div className="text-center text-white text-3xl mb-4">
          Выберите ваш месяц
        </div>
      </div>
      <div className="flex justify-center mb-40">
        <div className="w-[70%]">
          <div className="flex flex-col items-center">
            {months.map((month, index) => (
              <Button
                key={index}
                variant="forMonth"
                onClick={() => onMonthSelect(month)}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
