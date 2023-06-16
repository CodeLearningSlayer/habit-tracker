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
import useHabitsAPI from "../api/rest/habits.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, habitsSelector } from "../store/slices/habitsSlice.js";

function MainPage() {
  // const [habits, setHabits] = useState([]);
  const [numOfCompletedHabits, setNumOfCompletedHabits] = useState(0);
  const [totalNumOfHabits, setTotalNumOfHabits] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleHabits, setVisibleHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState({});
  const modalMode = useRef("creating");
  const {date, day} = getDateAndDay();
  const [habitsLoading, setHabitsLoading] = useState(false)
  const {user} = useSelector(state => state.user.user);
  const {process, setProcess, deleteHabit, addHabit, editHabit, setHabitCompleted} = useHabitsAPI(user); // нужен юзер
  // console.log(habits);

  const dispatch = useDispatch();
  const habits = useSelector(habitsSelector);


  const removeHabit = useCallback(function (habitId) {
    setHabitsLoading(habitsLoading => true);
    deleteHabit(habitId)
      // .then(() => setHabits(habits.filter((item) => item._id !== habitId)))
      .then(() => setHabitsLoading(habitsLoading => false))
      .then(() => setProcess("confirmed"));
  }, [habits, deleteHabit, setProcess]);


  const isEqSet = (xs, ys) =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

  const receiveHabits = useCallback(() => {
    // setHabitsLoading(true);
    dispatch(fetchHabits())
  }, [fetchHabits]);

  console.log(habits);

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


  const getAllFilters = () => {
    let currFilters = new Set();
    habits?.forEach((habit) => {
      currFilters.add(habit.filter);
    })
    if (!isEqSet(currFilters, new Set(filters)))
      setSelectedFilter("all");
    const filtersArr = Array.from(currFilters);
    if (filtersArr.length > 0) 
      setFilters(filtersArr);
  }

  useEffect(() => {
    getAllFilters(); //вынести 
    console.log("Получаю все фильтры");
  }, [habits])

  useEffect(() => {
    setTotalNumOfHabits(habits && habits.length);
    if (habits.length > 0)
      setVisibleHabits(habits);
    console.log('habits changed');

  }, [habits])

  useEffect(() => {
    if (numOfCompletedHabits !== 0 && totalNumOfHabits !== 0)
      setPercentage((numOfCompletedHabits / totalNumOfHabits * 100).toFixed());
    else setPercentage(0);
  }, [numOfCompletedHabits, totalNumOfHabits])
  
  const appendHabit = (habit) => {
    addHabit(habit)
      // .then(data => setHabits([...habits, data.newHabit]))
    console.log('добавляю')
  }

  const onHabitStatusChange = (habit, isCompleted) => {
    if (isCompleted) 
        setNumOfCompletedHabits(numOfCompletedHabits + 1);
      else
        setNumOfCompletedHabits(numOfCompletedHabits - 1);
      // setHabits(habits.map((habitIn) => {
      //   if (habit._id === habitIn._id){
      //     habitIn.isCompleted = isCompleted;
      //   }
      //   return habitIn;
      // }))
  }

  // /habits/update/:habitId
  const setHabitStatus = useCallback((habit, isCompleted) => {
    setHabitCompleted(habit._id, isCompleted)
      .then(() => onHabitStatusChange(habit, isCompleted))
  }, [setHabitCompleted, habits])

  const processEditHabit = useCallback((habit) => {
    setEditingHabit(habit);
    modalMode.current = "edit";
    setIsModalOpen(true);
  }, [])

  const replaceHabit = (habit) => {
    // setHabits(habits.map(habitIn => {
    //   if (habit.habitId === habitIn._id) {
    //     habitIn.name = habit.name;
    //     habitIn.filter = habit.filter;
    //     habitIn.description = habit.description;
    //   }
    //   return habitIn;
    // }))
  }

  const editHabitOnServer = async (habit) => {
    editHabit(habit)
      .then(() => replaceHabit(habit))
  }

  const filterHabits = useCallback((filter) => {
    if (filter === "all") {
      setVisibleHabits(habits);
      setSelectedFilter("all")
    } else {
        setVisibleHabits(habits.filter(habit => habit.filter === filter));
        setSelectedFilter(filter)
    }
  }, [habits])
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
                habitsLoading={habitsLoading}
                mode={modalMode}
                onButtonClick={setIsModalOpen} 
                filters={filters} 
                habits={visibleHabits} 
                numOfHabits={totalNumOfHabits} 
                handleDelete={removeHabit}
                process={process}
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
