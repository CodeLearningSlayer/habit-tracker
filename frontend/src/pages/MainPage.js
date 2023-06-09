import { useEffect, useState, useCallback, useRef } from "react";

import AddHabitModal from "../components/addHabitModal/AddHabitModal.js";
import HabitList from "../components/habitsList/HabitList";
import { Container } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import Greetings from "../components/greetings/Greetings";
import PickerLegend from "../components/pickerLegend/PickerLegend";
import InfoBox from "../components/infoBox/InfoBox";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { getDateAndDay } from "../utils/timeUtil.js";

function MainPage() {
  const [habits, setHabits] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [numOfCompletedHabits, setNumOfCompletedHabits] = useState(0);
  const [totalNumOfHabits, setTotalNumOfHabits] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleHabits, setVisibleHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState({});
  const modalMode = useRef("creating");
  const {date, day} = getDateAndDay();
  

  useEffect(() => {
    getUserIfAuth();
    // getUsers();
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
  }, [habits, user?._id]);

  useEffect(() => {
    setFilters([]);
  }, [deleteHabit])

  const isEqSet = (xs, ys) =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

  const getHabits = useCallback(async () => {
    fetch(`http://localhost:3010/api/habits/${user?._id}/allHabits`)
      .then((data) => data.json())
      .then((habitsInfo) => {
        setHabits(habitsInfo.habits);
      })
      .catch((e) => console.log("Ошибка при получении списка привычек"));
  }, [user?._id]);

  useEffect(() => {
    if (user !== null) {
      getHabits();
    }

  }, [user, getHabits])

  useEffect(() => {
    let completed = 0;
    habits.forEach((habit) => {
      if (habit.isCompleted){
        completed += 1
      }
    })
    setNumOfCompletedHabits(completed);
  }, [habits]) //посчитать 1 раз?? 


  useEffect(() => {
    getAllFilters(); //вынести 
    console.log("Получаю все фильтры");
  }, [habits.length])

  useEffect(() => {
    setTotalNumOfHabits(habits && habits.length);
    setVisibleHabits(habits);
    console.log('habits changed');
  }, [habits.length])

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
        setUser(data.user); // мемоизировать, при ререндере идёт новый запрос
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
    let currFilters = new Set();
    habits.forEach((habit) => {
      currFilters.add(habit.filter);
    })
    if (!isEqSet(currFilters, new Set(filters)));
      setSelectedFilter("all");
    setFilters(Array.from(currFilters));
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
    console.log(result);
    if (res.status === 200)
      setHabits([...habits, result.newHabit]);
  }

  const getUsers = async () => {
    fetch("http://localhost:3010/api/users/allUsers")
      .then((data) => data.json())
      // .then(usersInfo => setUsers(usersInfo))
      .catch((e) => console.log("Ошибка при получении списка пользователей"));
  };

  // /habits/update/:habitId
  const setHabitCompleted = async (habit, isCompleted) => {
    const res = await fetch(`http://localhost:3010/api/habits/${user._id}/habits/update/${habit._id}`, {
      method: "POST",
      headers: new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')}),
      body: JSON.stringify({status: isCompleted})
    })
    const data = await res.json();
    if (res.status === 200) {
      if (isCompleted) 
        setNumOfCompletedHabits(numOfCompletedHabits + 1);
      else
        setNumOfCompletedHabits(numOfCompletedHabits - 1);
      setHabits(habits.map((habitIn) => {
        if (habit._id === habitIn._id){
          habitIn.isCompleted = isCompleted;
        }
        return habitIn;
      }))
    }
    
    console.log(data);
  }

  const editHabit = (habit) => {
    setEditingHabit(habit);
    modalMode.current = "edit";
    setIsModalOpen(true);
  }

  const replaceHabit = (habit) => {
    setHabits(habits.map(habitIn => {
      if (habit.habitId === habitIn._id) {
        habitIn.name = habit.name;
        habitIn.filter = habit.filter;
        habitIn.description = habit.description;
      }
      return habitIn;
    }))
  }

  const editHabitOnServer = async (habit) => {
    const res = await fetch(`http://localhost:3010/api/habits/${user._id}/habits/edit/${habit.habitId}`, {
      method: "POST",
      headers: new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')}),
      body: JSON.stringify(habit)
    })
    const data = await res.json();
    if (res.status === 200) {
      replaceHabit(habit);
    }
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
                // isLoading={isLoading} //получать его из хука запроса
                habits={visibleHabits} 
                numOfHabits={totalNumOfHabits} 
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
