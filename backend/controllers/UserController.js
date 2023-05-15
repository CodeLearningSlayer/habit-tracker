import User from "../models/User.js";
import Habit from "../models/Habit.js";

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.UserId)
        user.deleteOne(user);
        await user.save();
        console.log("deleted successfully")
    } catch(e){
        res.status(400).json({message: "Error while deleting user"})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("habits");
        if (users.length == 0) {
            return res.status(404).json({message: "There's no users"});
        }

        return res.json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Could not retrieve users"
        });
    }
}

export const getById = async (req, res) => {
    try {
       const user = await User.fin
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Could not retrieve users"
        });
    }
}