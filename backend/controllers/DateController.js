import Day from "../models/Day";
import User from "../models/User";

export const getMonth = async (req, res) => {
    try{ 
        const {monthName, userId} = req.params;
        const month = await User.findById(userId).populate("months").findOne({name: monthName}).populate("days").exec();
        res.json({
            month
        })
    }
    catch(e){
        console.log(e.message);
        res.status(500).jsons({
            message: "Error while getting month"
        })
    }
}

export const getDayStatus = async(req, res) => {
    try{
        const {dayTime, userId, month} = req.params;
        const day = User.findById(userId).populate('months').findOne(month).populate('days').findOne({day: dayTime});
        res.status(200).json(day.status)
    }
    catch(e){
        res.status(500).json({message: "Error while getting day status"})
    }
}

export const createDay = async(req, res) => {
    try{
        const {day} = req.body;
    }
    catch(e) {

    }
}