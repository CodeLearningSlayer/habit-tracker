import { useEffect, useState } from "react";
import "./styles/style.scss";

import LoginForm from "./components/loginForm/LoginForm.js";
import RegisterForm from "./components/registerForm/RegisterForm";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./components/sideBar/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState();
  const [user, setUser] = useState(null);
  const [timeOfTheDay, setTimeOfTheDay] = useState();
  const [activeNum, setActiveNum] = useState(0);



  useEffect(() => {
    getUserIfAuth();
    setMode("login");
    getTimeOfDay();
    // getUsers();
  }, []);


  const handleTabClick = (num) => {
    setActiveNum(num);
  }


  const getTimeOfDay = () => {
    let MyDate = new Date(),
    MyHours = MyDate.getHours();
    switch (true){
      case (MyHours >= 5) && (MyHours < 11):
        setTimeOfTheDay('Good morning, ');
        break;
      case (MyHours >= 11) && (MyHours < 16):
        setTimeOfTheDay('Good afternoon, ');
        break;
      case (MyHours >= 16) && (MyHours <= 23):
        setTimeOfTheDay('Good evening, ');
        break;
      case (MyHours >= 0) && (MyHours < 5):
        setTimeOfTheDay('Good night, ');
        break;
      default:
        return true
    }
  }



  useEffect(() => { // useCallback
    if (isAuth) {
      const getMe = async () => {
        const res = await fetch("http://localhost:3010/api/auth/me", {
        method: "GET",
        headers: new Headers(
          {'content-type': 'application/json',
          'authorization': localStorage.getItem('token')})
        });
        const data = await res.json();
        setUser(data.user);
      }
      getMe();
    }
  }, [isAuth])

  const getUserIfAuth = async () => {
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
            <Outlet/>
          </Container>
        </main>
      </div>
  );
}

export default App;
