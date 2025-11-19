import { createBrowserRouter } from "react-router";
import Mainlayout from "../Components/Mainlayout";
import Home from "../Components/Home";
import Errorpage from "../Components/Errorpage";
import Register from "../Components/Register";
import Details from "../Components/Details";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Allissues from "../Components/Allissues";
import PrivateRoute from "../Components/PrivateRoute";
import Myprofile from "../Components/Myprofile";
import Mycontribution from "../Components/Mycontribution";
import Addissue from "../Components/Addissue";
import Issues from "../Components/Issues";
import Myissues from "../Components/Myissues";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout />,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('https://communityserver-jwxh.onrender.com')

            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/signup',
                Component: Signup
            },
            {
                path: '/details/:id',
                element: (
                    <PrivateRoute>
                        <Details />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`https://communityserver-jwxh.onrender.com/complaints/${params.id}`)
            },
            {
                path: '/issues',
                Component: Issues,
                loader: () => fetch('https://communityserver-jwxh.onrender.com')
            },
            {
                path: '/allIssues',
                element: (
                    <PrivateRoute>
                        <Allissues />
                    </PrivateRoute>
                ),
                loader: () => fetch('https://communityserver-jwxh.onrender.com/complaints')
            },
            {
                path: '/myprofile',
                Component: Myprofile
            },
            {
                path: '/mycontribution',
                Component: Mycontribution
            },
            {
                path: '/myissues',
                element: (
                    <PrivateRoute>
                        <Myissues />
                    </PrivateRoute>
                )
            },
            {
                path: '/addissue',
                Component: Addissue,
            }
        ]
    },
    {
        path: '*',
        element: <Errorpage />
    }
]);
export default router