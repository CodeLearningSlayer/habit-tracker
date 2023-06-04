import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import AddHabitModal from "../components/addHabitModal/AddHabitModal.js";
import HabitList from "../components/habitsList/HabitList";
import LoginForm from "../components/loginForm/LoginForm.js";
import RegisterForm from "../components/registerForm/RegisterForm";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "../components/sideBar/SideBar";
import Greetings from "../components/greetings/Greetings";
import PickerLegend from "../components/pickerLegend/PickerLegend";
import InfoBox from "../components/infoBox/InfoBox";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { Outlet } from "react-router-dom";

function MainPage() {
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
  const [editingHabit, setEditingHabit] = useState({});
  const modalMode = useRef("creating");

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

  const deleteHabit = useCallback(async function (habitId) {
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
    getHabits();
  }, [user, habits]);

  useEffect(() => {
    setFilters([]);
  }, [deleteHabit])

  useEffect(() => {
    if (user !== null)
    getHabits();

  }, [user])

  const calculateCompleted = () => {
    let completed = 0;
    habits.forEach((habit) => {
      if (habit.isCompleted){
        completed += 1
      }
    })
    console.log(completed)
    setNumOfCompletedHabits(completed);
  }

   useEffect(() => calculateCompleted(), [habits])

  useEffect(() => {
    setTotalNumOfHabits(habits && habits.length);
    getAllFilters();
    setVisibleHabits(habits);
    console.log('habits changed');
  }, [habits, filters])

  useEffect(() => {
  }, [totalNumOfHabits])

  useEffect(() => {
    if (numOfCompletedHabits !== 0)
      setPercentage((numOfCompletedHabits / totalNumOfHabits * 100).toFixed());
    else setPercentage(0);
  }, [numOfCompletedHabits, totalNumOfHabits])

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
    console.log("Обновляю фильтры");
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
    getHabits();
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
        console.log(habitsInfo.habits);
      })
      .catch((e) => console.log("Ошибка при получении списка привычек"));
  };

  const countCompleted = (num) => {
    setNumOfCompletedHabits(numOfCompletedHabits + num);
  }
  // /habits/update/:habitId
  const setHabitCompleted = async (habitId, isCompleted) => {
    const res = await fetch(`http://localhost:3010/api/habits/${user._id}/habits/update/${habitId}`, {
      method: "POST",
      headers: new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')}),
      body: JSON.stringify({status: isCompleted})
    })
    const data = await res.json();
    console.log(data);
  }

  const editHabit = (habit) => {
    setEditingHabit(habit);
    modalMode.current = "edit";
    setIsModalOpen(true);
  }

  const editHabitOnServer = async ({name, description, filter, habitId}) => {
    const res = await fetch(`http://localhost:3010/api/habits/${user._id}/habits/edit/${habitId}`, {
      method: "POST",
      headers: new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')}),
      body: JSON.stringify({name, description, filter})
    })
    const data = await res.json();
    console.log(data);
    getHabits();
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
                mode={modalMode}
                onButtonClick={setIsModalOpen} 
                filters={filters} 
                habits={visibleHabits} 
                numOfHabits={totalNumOfHabits} 
                handleHabitClick={countCompleted}
                handleDelete={deleteHabit}
                handleEdit={editHabit}
                setHabitCompleted={setHabitCompleted}></HabitList>
              </ErrorBoundary>

            </div>
            <AddHabitModal mode={modalMode} 
              habit={editingHabit} 
              isModalOpen={isModalOpen} 
              addHabit={addHabit} 
              filters={filters} 
              setIsModalOpen={setIsModalOpen}
              editHabit={editHabitOnServer}/>
          </Container>
        </main>
  );
}

export default MainPage;
