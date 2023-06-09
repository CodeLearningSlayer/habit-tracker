import { useEffect, useState, useCallback, useRef } from "react";
import AddHabitModal from "../components/addHabitModal/AddHabitModal.js";
import HabitList from "../components/habitsList/HabitList";
import { Container, LinearProgress } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import Greetings from "../components/greetings/Greetings";
import PickerLegend from "../components/pickerLegend/PickerLegend";
import InfoBox from "../components/infoBox/InfoBox";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { getDateAndDay } from "../utils/timeUtil.js";
import useHabitsAPI from "../api/rest/habits.js";
import useUserAPI from "../api/rest/user.js";


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
  const {process, setProcess, deleteHabit, addHabit, editHabit, setHabitCompleted, getHabits} = useHabitsAPI(user); // нужен юзер
  const {getMe} = useUserAPI();
  useEffect(() => {
    getUserIfAuth();
    // getUsers();
  }, []);

  const removeHabit = useCallback(async function (habitId) {
    deleteHabit(habitId)
      .then(() => setHabits(habits.filter((item) => item._id !== habitId)))
      .then(setProcess("confirmed"));
  }, [habits, user?._id]);

  const isEqSet = (xs, ys) =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

  const receiveHabits = useCallback(async () => {
    getHabits()
      .then(data => setHabits(data.habits))
      .then(setProcess("confirmed"));
  }, [user?._id]);

  useEffect(() => {
    if (user !== null) {
      receiveHabits();
    }

  }, [user, receiveHabits])

  useEffect(() => {
    let completed = 0;
    habits?.forEach((habit) => {
      if (habit.isCompleted){
        completed += 1
      }
    })
    setNumOfCompletedHabits(completed);
  }, [habits]) //посчитать 1 раз?? 


  useEffect(() => {
    getAllFilters(); //вынести 
    console.log("Получаю все фильтры");
  }, [habits])

  useEffect(() => {
    setTotalNumOfHabits(habits && habits.length);
    setVisibleHabits(habits);
    console.log('habits changed');
  }, [habits?.length])

  useEffect(() => {
    if (numOfCompletedHabits !== 0 && totalNumOfHabits !== 0)
      setPercentage((numOfCompletedHabits / totalNumOfHabits * 100).toFixed());
    else setPercentage(0);
  }, [numOfCompletedHabits, totalNumOfHabits])

  useEffect(() => { // useCallback
    if (isAuth) {
      getMe()
        .then(data => setUser(data.user));
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
    habits?.forEach((habit) => {
      currFilters.add(habit.filter);
    })
    if (!isEqSet(currFilters, new Set(filters)))
      setSelectedFilter("all");
    setFilters(Array.from(currFilters));
  }

  const appendHabit = async (habit) => {
    addHabit(habit)
      .then(data => setHabits([...habits, data.newHabit]))
    console.log('добавляю')
  }

  const onHabitStatusChange = (habit, isCompleted) => {
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

  // /habits/update/:habitId
  const setHabitStatus = async (habit, isCompleted) => {
    setHabitCompleted(habit._id, isCompleted)
      .then(() => onHabitStatusChange(habit, isCompleted))
  }

  const processEditHabit = (habit) => {
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
    editHabit(habit)
      .then(() => replaceHabit(habit))
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
                handleDelete={removeHabit}
                handleEdit={processEditHabit}
                setHabitCompleted={setHabitStatus}></HabitList>
              </ErrorBoundary>

            </div>
            <AddHabitModal mode={modalMode} 
              habit={editingHabit} 
              isModalOpen={isModalOpen} 
              addHabit={appendHabit} 
              filters={filters} 
              setIsModalOpen={setIsModalOpen}
              editHabit={editHabitOnServer}/>
          </Container>
        </main>
  );
}

export default MainPage;
