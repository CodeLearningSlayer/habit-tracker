import User from "../models/User.js"
import Habit from "../models/Habit.js"

export const addHabit = async (req, res) => {
    try {
        const {name, description, notificationTime} = req.body;

        const newHabit = new Habit({
            name,
            user: req.UserId,
            description,
            notificationTime,
            startDate: Date.now()
        })
        await newHabit.save() 
        await User.findByIdAndUpdate(req.UserId, {
            $push: {habits: newHabit}
        });
        res.json(newHabit)
    } catch(e) {
        console.log(e);
        res.json({message: "Ошибка при попытке создания новой привычки"});
    }
}

export const deleteHabit = async (req, res) => {
    try{
        await User.findOneAndUpdate(
            {_id: req.UserId, "habits.habit": req.params.habitId},
            { $pull: { habits: { habit: req.params.habitId} } }
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: "Habit not found"
                });
            }

            res.json({
                message: "Habit have been deleted"
            })
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: "An error ocurred while deleting habit"
        })
    }
}

export const getAllHabits = async(req, res) => {
    try {
        const habits = await Habit.find();
        if (habits.length == 0){
            return res.status(500).json({message: "No habits"});
        }
        
        return res.json(habits);
    }
    catch(e) {
        console.log(e.message);
        res.status(500).json({
            message: "No habits retrieved"
        });
    }
}  