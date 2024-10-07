import BackArrow from "../assets/BackArrow";
import { Button } from "./Button";

interface ProjectListComponentProps {
  loading: boolean;
  projects: string[];
  onProjectSelect: (project: string) => void;
  backRout: string;
}

export const ProjectListComponent: React.FC<ProjectListComponentProps> = ({
  loading,
  projects,
  onProjectSelect,
  backRout,
}) => {
  return (
    <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
      <BackArrow lastPage={backRout} />
      <div className="pt-8 px-[10%]">
        <div className="text-center text-white text-3xl mb-4">
          Выберите ваш проект:
        </div>
      </div>
      <div className="flex justify-center mb-40">
        <div className="w-[70%]">
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="text-white text-center text-2xl">
                Загрузка проектов...
              </div>
            ) : projects === null || projects.length === 0 ? (
              <div className="text-white text-center text-2xl">
                Проекты ещё не были созданы
              </div>
            ) : (
              projects.map((project, index) => (
                <Button
                  key={index}
                  variant="forMonth"
                  onClick={() => onProjectSelect(project)}
                >
                  {project}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
