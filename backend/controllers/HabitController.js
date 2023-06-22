import User from "../models/User.js"
import Habit from "../models/Habit.js"

export const addHabit = async (req, res) => {
    try {
        const {name, description, filter, isCompleted} = req.body;
        console.log(typeof(id));
        const newHabit = new Habit({
            name,
            user: req.params.id,
            description,
            filter,
            isCompleted,
            startDate: Date.now()
        })
        await newHabit.save() 
        await User.findByIdAndUpdate(req.params.id, {
            $push: {habits: newHabit}
        });
        res.status(200).json({newHabit});
    } catch(e) {
        console.log(e);
        res.status(500).json({message: "Ошибка при попытке создания новой привычки"});
    }
}

export const deleteHabit = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
      
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
      
        // Находим индекс привычки, которую нужно удалить
        const habitIndex = user.habits.findIndex((habit) => habit.toString() === req.params.habitId);
      
        if (habitIndex === -1) {
          return res.status(404).json({
            message: "Habit not found",
          });
        }
      
        // Удаляем привычку по индексу из массива habits
        user.habits.splice(habitIndex, 1);
      
        await user.save();
      
        res.status(200).json({
          message: "Habit deleted successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
}

export const setHabitCompleted = async(req, res) => {
    try{
        const habit = await Habit.findOne({_id: req.params.habitId, user: req.params.id});
        habit.set({isCompleted: req.body.status});
        await habit.save();
        res.json({message: `updated successfully, now status is ${habit.isCompleted}`});
    }
    catch(err) {
            res.status(500).json({message: "error while updating"});
            console.log(err);
    }
}

export const resetAndGetAllHabits = async(req, res) => {
  try{
    const {id} = req.params;
    console.log(id);
    // const allUserHabits = await Habit.find({user: req.params.userId});
    const user = await User.findById(id).populate("habits").exec();
    const {habits} = user;
    for (let habit of habits) {
      console.log(habit);
      habit.set({isCompleted: false});
      await habit.save();
    }
    res.status(200).json(habits);
  }
  catch(e) {
    console.log(e.message);
    res.status(500).json("Ошибка сброса привычек");
  }
}

export const editHabit = async(req, res) => {
  try {
    const habit = await Habit.findOne({_id: req.params.habitId, user: req.params.id});
    const {name, description, filter} = req.body;
    habit.set({name, description, filter});
    await habit.save();
  }
  catch(err) {
    res.status(500).json({message: "error while editing"});
    console.log(err);
}
res.json({message: "edited successfully"});
}

export const getAllHabits = async(req, res) => {
    try {
        console.log("req.params = ", req.params);
        const user = await User.findById(req.params.id).populate("habits").exec();

        res.json({
            habits: user.habits
        })
    }
    catch(e) {
        console.log(e.message);
        res.status(500).json({
            message: "No habits retrieved"
        });
    }
}  