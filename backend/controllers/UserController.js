import User from "../models/User.js";
import Habit from "../models/Habit.js";

// export const seeder = async () => {
//     try{
//         await User.deleteMany();
//         await Habit.deleteMany();

//         const users = [
//             new User({
//                 username: "Maxim Rubtsov", 
//                 email: "test123@gmail.com",
//                 password: "test123321",
//                 habits: [
//                     await Habit.find().then((data) => data[0]?._id),
//                     await Habit.find().then((data) => data[1]?._id)
//                     ],
//             }),
//             new User({
//                 username: "Eugene Burdakov", 
//                 email: "test@gmail.com",
//                 password: "test123321",
//                 habits: [
//                     await Habit.find().then((data) => data[2]?._id),
//                     await Habit.find().then((data) => data[3]?._id)
//                     ],
//             })
//         ];

//         User.insertMany(users).then(() => {
//             console.log("Users added");
//         }).catch((err) => {
//             console.log("Error ocurred while seeding users", err.message);
//         })

//         const habits = [
//             new Habit({
//                 name: "Делать зарядку с утра",
//                 description: "Легкая разминка",
//                 startDate: Date.now(),
//                 user: await User.find().then((data) => data[0]._id)
//             }),
//             new Habit({
//                 name: "Составить план на день",
//                 startDate: Date.now(),
//                 user: await User.find().then((data) => data[0]._id)
//             }),
//             new Habit({
//                 name: "Почистить зубы на ночь",
//                 startDate: Date.now(),
//                 user: await User.find().then((data) => data[0]._id)
//             }),
//             new Habit({
//                 name: "Выпить 2л воды",
//                 startDate: Date.now(),
//                 user: await User.find().then((data) => data[1]._id)
//             }),
//             new Habit({
//                 name: "Питаться правильно",
//                 startDate: Date.now(),
//                 user: await User.find().then((data) => data[1]._id)
//             })
//         ];
        
//         Habit.insertMany(habits)
//         .then(() => {
//             console.log("Habits added");
//         })
//         .catch((err) => {
//             console.log("Error ocurred while seeding habits\n", err.message)
//         });

//     } catch (err) {
//         console.log(err);
//     }
        
// };

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.UserId)
        User.deleteOne(user);
    } catch(e){}
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