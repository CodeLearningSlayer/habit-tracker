import Day from "../models/Day.js";
import Month from "../models/Month.js";
import User from "../models/User.js";

export const getMonth = async (req, res) => {
    try{ 
        const {monthName, userId} = req.params;
        const user = await User.findById(userId).populate("months").exec();
        console.log(user);
        const months = user.months || {};
        const monthToResponse = months.find(month => month.name == monthName);
        if (!monthToResponse) {
            const newMonth = new Month({
                name: monthName,
                days: [],
                user: userId
            });
            await newMonth.save();
            await User.findByIdAndUpdate(userId, {
                $push: {months: newMonth}
            });
            res.status(200).json(newMonth);
        }
        
        res.status(200).json(monthToResponse);
        
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({
            message: "Error while getting month"
        })
    }
}

export const getDayStatus = async(req, res) => {
    try{
        const {dayTime, userId, month} = req.params;
        const day = await User.findById(userId).populate('months').findOne(month).populate('days').findOne({day: dayTime}).exec();
        res.status(200).json(day.status)
    }
    catch(e){
        res.status(500).json({message: "Error while getting day status"})
    }
}

export const createDayRecord = async(req, res) => {
    try{
        const {month, userId} = req.params;
        const {day} = req.body;
        const newDay = new Day({
            day
        });
        await newDay.save();
        await Month.findOneAndUpdate({name: month, user: userId}, {$push: {days: newDay}})
        res.status(200).json({message: "День успешно добавлен"});
    }
    catch(e) {
        res.status(500).json(e.message);
    }
}