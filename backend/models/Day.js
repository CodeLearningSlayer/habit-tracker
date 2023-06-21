import mongoose from "mongoose";
const DaySchema = new mongoose.Schema({
    day: {type: Date, required: true},
    status: {type: String, required: true},
    month: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Month",
        required: true
    }
})

export default mongoose.model('Day', DaySchema);