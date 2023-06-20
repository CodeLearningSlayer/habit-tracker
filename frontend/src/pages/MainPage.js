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
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, filteredHabitsSelector } from "../store/slices/habitsSlice.js";
import { getFilters } from "../store/slices/filtersSlice.js";
import { habitsSelector } from "../store/slices/habitsSlice.js";
function MainPage() {
  const [percentage, setPercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState({});
  const modalMode = useRef("creating");
  const {date, day} = getDateAndDay();
  const {user} = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const filteredHabits = useSelector(filteredHabitsSelector);
  const habits = useSelector(habitsSelector);
  const {completedHabits, totalHabits} = useSelector(state => state.habits)
  const {filters} = useSelector(state => state.filters);
 
  const receiveHabits = useCallback(() => {
    dispatch(fetchHabits());
  }, [fetchHabits]);


  useEffect(() => {
    if (user !== null) {
      receiveHabits();
    }
  }, [user, receiveHabits])


  useEffect(() => {
    if (habits) {
      dispatch(getFilters({habits}))
    }
  }, [habits])

  useEffect(() => {
    if (completedHabits !== 0 && totalHabits !== 0)
      setPercentage((completedHabits / totalHabits * 100).toFixed());
    else setPercentage(0);
  }, [completedHabits, totalHabits])

  const processEditHabit = useCallback((habit) => {
    setEditingHabit(habit);
    modalMode.current = "edit";
    setIsModalOpen(true);
  }, [])

  return (
        <main className="right-side">
          <Container maxWidth="lg">
            <div className="right-side__inner">
              <Greetings name={user?.username} date={date} day={day}/>
              <InfoBox numOfCompletedHabits={completedHabits} 
                percentage={percentage}
                totalNumOfHabits={totalHabits}/>
              <PickerLegend/>

              <ErrorBoundary>
                <HabitList 
                mode={modalMode}
                onButtonClick={setIsModalOpen}
                filters={filters} 
                habits={filteredHabits}
                numOfHabits={totalHabits} 
                handleEdit={processEditHabit}></HabitList>
              </ErrorBoundary>
            </div>
            <AddHabitModal mode={modalMode} 
              habit={editingHabit} 
              isModalOpen={isModalOpen} 
              filters={filters} 
              setIsModalOpen={setIsModalOpen}/>
          </Container>
        </main>
  );
}

export default MainPage;
