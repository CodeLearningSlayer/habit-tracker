import useFetch from "../../hooks/useFetch";

const useHabitsAPI = (user) => {
    const {process, setProcess, fetchNow} = useFetch();

    const headers = new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')})
    const baseUrl = `http://localhost:3010/api/habits/${user?._id}/habits`
    const deleteHabit = async (habitId) => {
        //res - объект мб пустой вообще
        const data = fetchNow (
            `${baseUrl}/delete/${habitId}`, {
                method: "POST",
                headers: headers
        });
        if (process !== "error") {
            return data;
        }
    }
    // проверять status
    const getHabits = () => {
        const data = fetchNow(`http://localhost:3010/api/habits/${user?._id}/allHabits`);
        if (process !== "error")
            return data;
    }

    const addHabit = (habit) => {
        const data = fetchNow(`${baseUrl}/add`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(habit)
        });
        console.log(process);
        if (process !== "error")
            return data;
    }

    const setHabitCompleted = (habitId, isCompleted) => {
        const data = fetchNow(`${baseUrl}/update/${habitId}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({status: isCompleted})
        })
        if (process !== "error")
            return data;
    }

    const editHabit = (habit) => {
        const data = fetchNow(`${baseUrl}/edit/${habit.habitId}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(habit)
        });
        if (process !== "error")
            return data;
    }

    return {process, setProcess, deleteHabit, addHabit, editHabit, setHabitCompleted, getHabits}
}

export default useHabitsAPI;