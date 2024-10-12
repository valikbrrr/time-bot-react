import HomePage from "../pages/HomePage";
import MonthBranch from "../pages/Month/MonthBranch";
import ProjectBranch from "../pages/Project/ProjectBranch";
import AddHoursProject from "../pages/Project/AddHoursProject";
import AddHoursMonth from "../pages/Month/AddHoursMonth";
import ViewHoursMonth from "../pages/Month/ViewHoursMonth";
import ViewHoursProject from "../pages/Project/ViewHoursProject";
import CreateNewProject from "../pages/Project/CreateNewProject";
import OpenProjectList from "../pages/Project/OpenProjectList";

export const allRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/month-branch",
    element: <MonthBranch />,
  },
  {
    path: "/project-branch",
    element: <ProjectBranch />,
  },
  {
    path: "/add-hours-project",
    element: <AddHoursProject />,
  },
  {
    path: "/add-hours-month",
    element: <AddHoursMonth />,
  },
  {
    path: "/view-hours-month",
    element: <ViewHoursMonth />,
  },
  {
    path: "/view-hours-project",
    element: <ViewHoursProject />,
  },
  {
    // review пути через дефис path-to-abobus
    path: "/open-project-list",
    element: <OpenProjectList />,
  },
  {
    path: "/create-new-project",
    element: <CreateNewProject />,
  },
];
