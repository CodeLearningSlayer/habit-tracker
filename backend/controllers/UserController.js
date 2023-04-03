import User from "../models/User.js";
import Habit from "../models/Habit.js";

export const seeder = async () => {
    try{
        await User.deleteMany();
        await Habit.deleteMany();

        const habits = [
            new Habit({
                name: "Делать зарядку с утра",
                description: "Легкая разминка",
                startDate: Date.now()
            }),
            new Habit({
                name: "Составить план на день",
                startDate: Date.now()
            })
        ];

        Habit.insertMany(habits)
            .then(() => {
                console.log("Habits added");
            })
            .catch((err) => {
                console.log("Error ocurred while seeding habits")
            });

        const users = [
            new User({
                username: "Maxim Rubtsov", 
                email: "test123@gmail.com",
                habits: [
                    await Habit.find().then((data) => data[0]._id),
                    await Habit.find().then((data) => data[1]._id)
                    ],
            }),
        ];

        User.insertMany(users).then(() => {
            console.log("Users added");
        }).catch((err) => {
            console.log("Error ocurred while seeding users", err.message);
        })
       
    } catch (err) {
        console.log(err);
    }
        
};

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

export const addUser = async (req, res) => {
    try{

    } catch {}
}