import HomePage from "../pages/HomePage";
import MonthBranch from "../pages/Month/MonthBranch";
import ProjectBranch from "../pages/Project/ProjectBranch"
import AddHoursProject from "../pages/Project/AddHoursProject"
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
        path: "/mouthbranch",
        element: <MonthBranch />,
    },
    {
        path: "/projectbranch",
        element: <ProjectBranch />,
    },
    {
        path: "/addhoursproject",
        element: <AddHoursProject />,
    },
    {
        path: "/addhoursmonth",
        element: <AddHoursMonth />,
    },
    {
        path: "/viewhoursmonth",
        element: <ViewHoursMonth/>,
    },
    {
        path: "/viewhoursproject",
        element: <ViewHoursProject/>,
    },
    {
        path: "/openprojectlist",
        element: <OpenProjectList/>,
    },
    {
        path: "/createnewproject",
        element: <CreateNewProject/>,
    },
]