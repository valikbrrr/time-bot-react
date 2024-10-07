import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/BackArrow";
import { constRouts } from "../../config/constRouts";
import { Button } from "../../components/Button";

const AddHoursProject = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <BackArrow lastPage={constRouts.projectBranch} />
      <div className="pt-8 px-[10%]">
        <div className="text-center pt-8 text-white text-3xl mb-4">
          Что вы хотите сделать?
        </div>
      </div>
      <div className="flex justify-center mb-40">
        <div className="w-[70%]">
          <div className="flex flex-col items-center">
            <Button
              variant="buttonMenu"
              onClick={() => navigate(constRouts.openProjectList)}
              className="mb-4"
            >
              Открыть список проектов
            </Button>
            <Button
              variant="buttonMenu"
              onClick={() => navigate(constRouts.createNewProject)}
            >
              Cоздать новый проект
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHoursProject;
