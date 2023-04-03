import mongoose from "mongoose";
const HabitSchema = new mongoose.Schema(
    {
        _id: {type: mongoose.Types.ObjectId},
        name: {type: String, required: true},
        description: {type: String, required: false},
        notificationTime: {time: mongoose.Schema.Types.Date},
        startDate: {type: mongoose.Schema.Types.Date, required: true}
    },
    {timestamps: true},
);

export default mongoose.model('Habit', HabitSchema);