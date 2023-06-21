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


export const changeDayStatus = async(req, res) => {
    try{
        const {dayTime, userId, month} = req.params;
        const {status} = req.body;
        const MonthOfDay = await Month.findOne({name: month, user:userId}).populate({
            path: "days",
            match: {day: dayTime}
        });
        const day = MonthOfDay.days[0];
        day.set({status});
        await day.save();
        console.log(day);
        res.status(200).json("Статус дня изменён");
    }
    catch(e){
        console.log(e);
        res.status(500).json("Не удалось изменить статус дня");
    }
}

export const createDayRecord = async(req, res) => {
    try{
        const {month, userId} = req.params;
        const {day} = req.body;
        const MonthOfDay = await Month.findOne({name: month, user:userId}).populate({
            path: "days",
            match: {day}
        });
        const receivedDay = MonthOfDay.days[0]; 

        if (receivedDay) {
            res.status(200).json({message: "Запись по данному дню ведётся"})
            return;
        }

        const newDay = new Day({
            day,
            status: "nothing has been done yet",
            month: MonthOfDay._id
        });

        await newDay.save();
        await Month.findOneAndUpdate({name: month, user: userId}, {$push: {days: newDay}})
        res.status(200).json({message: "День успешно добавлен"});
    }
    catch(e) {
        res.status(500).json(e.message);
    }
}