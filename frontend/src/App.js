import { useEffect, useState } from "react";
import "./styles/style.scss";

import LoginForm from "./components/loginForm/LoginForm.js";
import RegisterForm from "./components/registerForm/RegisterForm";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import { getTimeOfDay } from "./utils/timeUtil";
import useUserAPI from "./api/rest/user";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState();
  const [user, setUser] = useState(null);
  const [timeOfTheDay, setTimeOfTheDay] = useState();
  const [activeNum, setActiveNum] = useState(0);
  const {getMe} = useUserAPI();


  useEffect(() => {
    getUserIfAuth();
    setMode("login");
    setTimeOfTheDay(getTimeOfDay())
  }, []);


  const handleTabClick = (num) => {
    setActiveNum(num);
  }


  useEffect(() => { // useCallback
    if (isAuth) {
      getMe()
        .then(data => setUser(data.user));
      }
    }, [isAuth])

  const getUserIfAuth = () => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
    else setIsAuth(false) 
  }




  const registerUser = async (data) => {
    const res = await fetch("http://localhost:3010/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await res.json();
    console.log(result);
  };

  const login = async (data) => {
      const userObj = {
          username: data.login,
          password: data.password
      };
      const res = await fetch("http://localhost:3010/api/auth/login", {
          method: "POST",
          headers: {
              'Content-type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(userObj)
      })
      let result = await res.json();
      if (result.token){
        setIsAuth(true);
        localStorage.setItem('token', result.token);
        setUser(result.user);
      }
      console.log(result);
  }

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('token');
  }

  const changeToRegister = () => {
    setMode('register');
  }
  

  const changeToLogin = () => {
    setMode('login');
  }


  return (
      <div className="App">
        {!isAuth && mode === "register" && <RegisterForm handleChangeModal={changeToLogin} registerUser={registerUser}/>}
        {!isAuth && mode === "login" && <LoginForm handleChangeModal={changeToRegister} loginHandle={login}/>}
        <SideBar name={user?.username} activeNum={activeNum}  clickHandle={handleTabClick} timeOfTheDay={timeOfTheDay} logout={logout}/>
        <main className="right-side">
          <Container maxWidth="lg">
            <Outlet context={[user, isAuth]}/>
          </Container>
        </main>
      </div>
  );
}

export default App;
