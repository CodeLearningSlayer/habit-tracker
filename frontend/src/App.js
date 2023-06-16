import { useEffect, useState } from "react";
import "./styles/style.scss";
import LoginForm from "./components/loginForm/LoginForm.js";
import RegisterForm from "./components/registerForm/RegisterForm";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import { getTimeOfDay } from "./utils/timeUtil";
import { getMe } from "./store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState();
  const [timeOfTheDay, setTimeOfTheDay] = useState();
  const [activeNum, setActiveNum] = useState(0);
  const {user} = useSelector(state => state.user.user);
  const dispatch = useDispatch();


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
      dispatch(getMe());
    }
  }, [isAuth])


  const getUserIfAuth = () => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
    else setIsAuth(false) 
  }

  const login = (data) => {
      // const user = loginUser(data);
      // if (user){
      //   setIsAuth(true);
      //   setUser(user);
      // }
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
        {!isAuth && mode === "register" && <RegisterForm handleChangeModal={changeToLogin}/>}
        {!isAuth && mode === "login" && <LoginForm handleChangeModal={changeToRegister} loginHandle={login}/>}
        <SideBar name={user?.username} activeNum={activeNum}  clickHandle={handleTabClick} timeOfTheDay={timeOfTheDay} logout={logout}/>
        <main className="right-side">
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </main>
      </div>
  );
}

export default App;
