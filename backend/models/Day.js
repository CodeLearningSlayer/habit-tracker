import mongoose from "mongoose";
const DaySchema = new mongoose.Schema({
    day: {type: Date, required: true}
})

export default mongoose.Model('Day', DaySchema);