import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Challenges from './pages/Challenges';
import Achievements from './pages/Achievements';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"/",
                element: <MainPage/>
            },
            {
                path: "challenges",
                element: <Challenges/>
            },
            {
                path:"achievements",
                element: <Achievements/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

