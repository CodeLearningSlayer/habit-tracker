import mongoose from "mongoose";
const ChallengeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        completed: {
            type: Boolean,
            default: False
        }
    }
)

export default mongoose.model("Challenge", ChallengeSchema);