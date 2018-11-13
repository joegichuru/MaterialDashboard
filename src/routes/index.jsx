import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "views/Login/Login.js"


const indexRoutes = localStorage.getItem("token")!=null?
    [{ path: "/", component: Dashboard }]:[{path:"/",component:Login}];

export default indexRoutes;
