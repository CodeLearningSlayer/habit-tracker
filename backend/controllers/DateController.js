import Day from "../models/Day.js";
import Month from "../models/Month.js";
import User from "../models/User.js";

const monthsDict = {
    "january" : 1,
    "february" : 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12
}

export const getMonth = async (req, res) => {
    try{ 
        const {monthName, userId} = req.params;
        if (!(monthName in monthsDict)) {
            res.status(500).json("неправильный формат месяца");
        }
        const user = await User.findById(userId).populate("months").exec();
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
        res.status(200).json("Статус дня изменён");
    }
    catch(e){
        console.log(e);
        res.status(500).json("Не удалось изменить статус дня");
    }
}

export const createDayRecordIfNotCreated = async(req, res) => {
    try{
        const {month, userId} = req.params;
        const {day} = req.body;
        const MonthOfDay = await Month.findOne({name: month, user:userId}).populate({
            path: "days",
            match: {day}
        });
        const receivedDay = MonthOfDay.days[0]; 

        if (receivedDay) {
            res.status(200).json({message: "Запись по данному дню ведётся", status: "recording"})
            return;
        }

        const newDay = new Day({
            day,
            status: "nothing has been done yet",
            month: MonthOfDay._id
        });

        await newDay.save();
        await Month.findOneAndUpdate({name: month, user: userId}, {$push: {days: newDay}})
        res.status(200).json({message: "День успешно добавлен", status: "new day"});
    }
    catch(e) {
        res.status(500).json(e.message);
    }
}