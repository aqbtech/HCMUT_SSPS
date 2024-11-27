import Layout1 from "../components/Layouts/Layout1";
import Layout2 from "../components/Layouts/Layout2";
import Layout3 from "../components/Layouts/Layout3";
import HomePage from "../pages/HomePage";

const userData = localStorage.getItem("userData");

export const routes = [
    {
        path:"/",
        element:<HomePage />,
    }
]