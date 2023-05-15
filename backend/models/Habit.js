import mongoose from "mongoose";
const HabitSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        notificationTime: {type: mongoose.Schema.Types.Date},
        startDate: {type: mongoose.Schema.Types.Date, required: true},
        filter : {type: String},
        isCompleted : {type: Boolean},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true},
);

export default mongoose.model('Habit', HabitSchema);