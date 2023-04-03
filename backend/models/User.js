import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        habits: [
            {type: mongoose.Schema.Types.ObjectId, ref:"Habit"}
        ]
    },
    {timestamps: true},
);

export default mongoose.model('User', UserSchema);