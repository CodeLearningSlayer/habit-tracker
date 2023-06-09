export default class HabitsAPI {
    constructor(user){
        this.user = user;
        this.headers = new Headers(
            {'content-type': 'application/json',
            'authorization': localStorage.getItem('token')})
        this.baseUrl = `http://localhost:3010/api/habits/${this.user._id}/habits`
    }
    
    deleteHabit = async (habitId) => {
        const res = await fetch(
            `${this.baseUrl}/delete/${habitId}`, {
                method: "POST",
                headers: this.headers
        });
        return res
    }

    getHabits = async () => {
        const res = await  fetch(`${this.baseUrl}/allHabits`);
        if (res.status === 200) {
            const data = res.json();
            return data;
        }
        else 
            throw(new Error("Проблема получения списка привычек"));
    }

    addHabit = async (habit) => {
        const res = await fetch(`${this.baseUrl}/add`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(habit)
        });
        const result = await res.json();
        if (res.status === 200) {
            return result.newHabit;
        }
        else throw(new Error("Ошибка добавления привычки"))
    }

    setHabitCompleted = async(habitId, isCompleted) => {
        const res = await fetch(`${this.baseUrl}/update/${habitId}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({status: isCompleted})
        })
        const data = await res.json();
        if (res.status === 200) {
            return data
        }  else throw(new Error("Ошибка изменения статуса"))
    }

    editHabit = async (habit) => {
        const res = await fetch(`${this.baseUrl}/edit/${habit.habitId}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(habit)
        });
        if (res.status === 200) {
            return true
        } else throw(new Error("Ошибка изменения привычки"));
    }
}