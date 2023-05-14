import UserList from "./components/userList/UserList";
import { useCallback, useEffect, useState } from "react";
import "./styles/style.scss";

import AddHabitModal from "./components/addHabitModal/AddHabitModal.js";
import HabitList from "./components/habitsList/HabitList";
import LoginForm from "./components/loginForm/LoginForm.js";
import RegisterForm from "./components/registerForm/RegisterForm";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./components/sideBar/SideBar";
import Greetings from "./components/greetings/Greetings";
import PickerLegend from "./components/pickerLegend/PickerLegend";
import InfoBox from "./components/infoBox/InfoBox";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

function App() {
  const [habits, setHabits] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState();
  const [numOfCompletedHabits, setNumOfCompletedHabits] = useState(0);
  const [totalNumOfHabits, setTotalNumOfHabits] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [user, setUser] = useState(null);
  const [timeOfTheDay, setTimeOfTheDay] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleHabits, setVisibleHabits] = useState([]);

  // вынести в utils
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

  useEffect(() => {
    getUserIfAuth();
    setMode("login");
    // getUsers();
    getTimeOfDay();
  }, []);

  useEffect(() => {
    console.log("Запрашивая привычки");
    if (user !== null)
    getHabits();

  }, [user])

  useEffect(() => {
    setTotalNumOfHabits(habits && habits.length);
    getAllFilters();
    setVisibleHabits(habits)
    console.log(habits);
  }, [habits, filters])

  useEffect(() => {
    if (numOfCompletedHabits !== 0)
      setPercentage((numOfCompletedHabits / totalNumOfHabits * 100).toFixed());
    else setPercentage(0);
  }, [numOfCompletedHabits])

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

  const getAllFilters = () => {
    habits.forEach((habit) => {
      if (filters.indexOf(habit.filter) === -1)
        setFilters([...filters, habit.filter])
    })
  }

  const addHabit = async (habit) => {
    const res = await fetch(`http://localhost:3010/api/habits/${user._id}/habits/add`, {
      method: "POST",
      headers: new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')}),
      body: JSON.stringify(habit)
    });
    const result = await res.json();
    setHabits([...habits, habit])
    console.log(result);
  }

  const getUsers = async () => {
    fetch("http://localhost:3010/api/users/allUsers")
      .then((data) => data.json())
      // .then(usersInfo => setUsers(usersInfo))
      .catch((e) => console.log("Ошибка при получении списка пользователей"));
  };

  const getHabits = async () => {
    fetch(`http://localhost:3010/api/habits/${user?._id}/allHabits`)
      .then((data) => data.json())
      .then((habitsInfo) => {
        setHabits(habitsInfo.habits);
      })
      .catch((e) => console.log("Ошибка при получении списка привычек"));
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

  const countCompleted = (num) => {
    setNumOfCompletedHabits(numOfCompletedHabits + num);
  }

  const deleteHabit = async (habitId) => {
    const res = await fetch(
      `http://localhost:3010/api/habits/${user._id}/habits/delete/${habitId}`, {
        method: "POST",
        headers: new Headers(
          {'content-type': 'application/json',
          'authorization': localStorage.getItem('token')})
      });
    if (res.status === 200) {
      setHabits(habits.filter((item) => item._id !== habitId));
    } console.log(await res.json())
  };

  const editHabit = async (habit) => {
    
  }

  const filterHabits = (filter) => {
    if (filter === "all") {
      setVisibleHabits(habits);
      setSelectedFilter("all")
    } else
      setVisibleHabits(habits.filter(habit => habit.filter === filter));
      setSelectedFilter(filter)
  }
  return (
      <div className="App">
        {!isAuth && mode === "register" && <RegisterForm registerUser={registerUser}/>}
        {!isAuth && mode === "login" && <LoginForm loginHandle={login}/>}
        <SideBar name={user?.username} timeOfTheDay={timeOfTheDay} logout={logout}/>
        <main className="right-side">
          <Container maxWidth="lg">
            <div className="right-side__inner">
              <Greetings name={user?.username} date={date} day={day}/>
              <InfoBox numOfCompletedHabits={numOfCompletedHabits} 
                percentage={percentage}
                totalNumOfHabits={totalNumOfHabits}/>
              <PickerLegend/>

              <ErrorBoundary>
                <HabitList selectedFilter={selectedFilter} 
                handleFilterClick={filterHabits} 
                onButtonClick={setIsModalOpen} 
                filters={filters} 
                habits={visibleHabits} 
                numOfHabits={totalNumOfHabits} 
                handleHabitClick={countCompleted}
                handleDelete={deleteHabit}
                handleEdit={editHabit}></HabitList>
              </ErrorBoundary>
            </div>
            <AddHabitModal isModalOpen={isModalOpen} addHabit={addHabit} filters={filters} setIsModalOpen={setIsModalOpen}/>
          </Container>
        </main>
      </div>
  );
}

export default App;
