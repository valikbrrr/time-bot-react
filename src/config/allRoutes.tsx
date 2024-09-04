import HomePage from "../pages/HomePage";
import MonthBranch from "../pages/Month/MonthBranch";
import ProjectBranch from "../pages/Project/ProjectBranch"

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
    }
]