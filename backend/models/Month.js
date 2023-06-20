import mongoose from "mongoose";
const MonthSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        days: [
            {type: mongoose.Schema.Types.ObjectId, ref:"Day"}
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
)

export default mongoose.model('Month', MonthSchema);