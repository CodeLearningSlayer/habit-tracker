import useFetch from "../../hooks/useFetch";
import { useCallback } from "react";

const useHabitsAPI = (user) => {
    const {process, setProcess, fetchNow} = useFetch();
    const headers = new Headers(
        {'content-type': 'application/json',
        'authorization': localStorage.getItem('token')})
    const baseUrl = `http://localhost:3010/api/habits/${user?._id}/habits`
    const deleteHabit = useCallback((habitId) => {
        //res - объект мб пустой вообще
        const data = fetchNow (
            `${baseUrl}/delete/${habitId}`, {
                method: "POST",
                headers: headers
        });
        if (process !== "error") {
            return data;
        }
    }, [baseUrl, fetchNow, process]);
    // проверять status

    const getHabits = useCallback(() => {
        const data = fetchNow(`http://localhost:3010/api/habits/${user?._id}/allHabits`);
        if (process !== "error")
            return data;
    }, [baseUrl]);

    const addHabit = useCallback((habit) => {
        const data = fetchNow(`${baseUrl}/add`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(habit)
        });
        console.log(process);
        if (process !== "error")
            return data;
    }, [baseUrl]);

    const setHabitCompleted = useCallback((habitId, isCompleted) => {
        const data = fetchNow(`${baseUrl}/update/${habitId}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({status: isCompleted})
        })
        if (process !== "error")
            return data;
    }, [baseUrl]);

    const editHabit = useCallback((habit) => {
        const data = fetchNow(`${baseUrl}/edit/${habit.habitId}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(habit)
        });
        if (process !== "error")
            return data;
    }, [baseUrl]);

    return {process, setProcess, deleteHabit, addHabit, editHabit, setHabitCompleted, getHabits}
}

export default useHabitsAPI;