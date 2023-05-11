import UserList from "./components/userList/UserList";
import { useCallback, useEffect, useState } from "react";
import "./styles/style.scss";

import AddHabitForm from "./components/addHabitForm/AddHabitForm";
import HabitList from "./components/habitsList/HabitList";
import LoginForm from "./components/loginForm/LoginForm.js";
import RegisterForm from "./components/registerForm/RegisterForm";
import AccountTab from "./components/accountTab/AccountTab";
import Tab from "./components/tab/Tab";
import HabitCheckBox from "./components/habitCheckBox/HabitCheckBox";
import {
  Container,
  Typography,
  Box,
  Stack,
  Chip,
  Checkbox,
  Button,
} from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./components/sideBar/SideBar";
import ProgressBoard from "./components/progressBoard/ProgressBoard";
import Calendar from "./components/calendar/Calendar";
import Greetings from "./components/greetings/Greetings";
import PickerLegend from "./components/pickerLegend/PickerLegend";
import InfoBox from "./components/infoBox/InfoBox";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

function App() {
  const [habits, setHabits] = useState([]);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("Maxim");
  const [numOfCompletedHabits, setNumOfCompletedHabits] = useState(0);
  const [totalNumOfHabits, setTotalNumOfHabits] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };

  const date = new Date(Date.now()).toLocaleString("ru", dateOptions);
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  let day = new Date(Date.now()).getDay();
  day = day > 0 ? days[day - 1] : days[6];
  console.log(day);

  useEffect(() => {
    getUsers();
    getHabits();
  }, []);

  useEffect(() => {
    if (numOfCompletedHabits !== 0)
      setPercentage(numOfCompletedHabits / totalNumOfHabits * 100);
    else setPercentage(0);
  }, [numOfCompletedHabits])

  const getUsers = async () => {
    fetch("http://localhost:3010/api/users/allUsers")
      .then((data) => data.json())
      // .then(usersInfo => setUsers(usersInfo))
      .catch((e) => console.log("Ошибка при получении списка пользователей"));
  };

  const getHabits = async () => {
    fetch("http://localhost:3010/api/habits/allHabits")
      .then((data) => data.json())
      .then((habitsInfo) => {
        setHabits(habitsInfo);
        setTotalNumOfHabits(habitsInfo.length);
      })
      .catch((e) => console.log("Ошибка при получении списка привычек"));
  };

  const getCurrentUser = async (user) => {
    setName(user.name);
  };

  const deleteUser = (email) => {
    fetch("http://localhost:3010/api/habits/delete:habitId");
  };

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

  const countCompleted = (num) => {
    setNumOfCompletedHabits(numOfCompletedHabits + num);
  }

  const deleteHabit = async (habitId, userId) => {
    const res = await fetch(
      `http://localhost:3010/api/${userId}/habits/delete/${habitId}`
    );
    if (res.status === 200) {
      setHabits(habits.filter((item) => item._id !== habitId));
    } else console.log("Error while delete habit");
  };

  return (
    <div className="App">
      <SideBar />

      <main className="right-side">
        <Container maxWidth="lg">
          <div className="right-side__inner">
            <Greetings date={date} day={day}/>
            <InfoBox numOfCompletedHabits={numOfCompletedHabits} 
              percentage={percentage}
              totalNumOfHabits={totalNumOfHabits}/>
            <PickerLegend/>

            <ErrorBoundary>
              <HabitList habits={habits} numOfHabits={totalNumOfHabits} handleHabitClick={countCompleted}></HabitList>
            </ErrorBoundary>
          </div>
          
        </Container>
      </main>
    </div>
  );
}

export default App;
