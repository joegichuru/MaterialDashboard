import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import LoginTab from "views/Login/Login.js"
import Users from "components/User/User.js"
import Items from "components/Item/Item.js"
import UsersList from  "views/UsersList/UsersList.js"
import ItemsList from  "views/ItemList/ItemList.js"

import {
    Dashboard,
    Person,
    ContentPaste,
    LibraryBooks,
    BubbleChart,
    LocationOn,
    Notifications,
    PieChart,Home
} from "@material-ui/icons";

const dashboardRoutes = [
    {
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: Dashboard,
        component: DashboardPage
    },
    // {
    //     path: "/user",
    //     sidebarName: "User Profile",
    //     navbarName: "Profile",
    //     icon: Person,
    //     component: UserProfile
    // },
    // {
    //     path: "/table",
    //     sidebarName: "Table List",
    //     navbarName: "Table List",
    //     icon: ContentPaste,
    //     component: TableList
    // },
    {
        path: "/posts",
        sidebarName: "Posts",
        navbarName: "Posts",
        icon: Home,
        component: ItemsList
    },

    // {
    //     path: "/reports",
    //     sidebarName: "Icons",
    //     navbarName: "Icons",
    //     icon: PieChart,
    //     component: Users
    // },
    {
        path: "/users",
        sidebarName: "Users",
        navbarName: "Users",
        icon: Person,
        component: UsersList
    },
    {
        path: "/maps",
        sidebarName: "Maps",
        navbarName: "Map",
        icon: LocationOn,
        component: Maps
    },
    // {
    //     path: "/notifications",
    //     sidebarName: "Notifications",
    //     navbarName: "Notifications",
    //     icon: Notifications,
    //     component: NotificationsPage
    // },
    {redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect"}
];

export default dashboardRoutes;
