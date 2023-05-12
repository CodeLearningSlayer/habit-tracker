import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register user
export const register = async (req, res) => {
    try{
        const {username, password, email} = req.body;

        const isUsed = await User.findOne({username});

        // можно использовать middleware
        if (isUsed) {
            return res.status(402).json({
                message: "Данный никнейм уже занят"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.init();
        const newUser = new User({
            username,
            password: hash,
            email
        })

        await newUser.save();

        res.json({
            newUser, message: "Регистрация прошла успешно"
        })

    } catch (error) {
        res.json({message: `Ошибка при создании пользователя ${error.message}`})
    }
}
//Login user
export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user) {
            return res.json({
                message: "Такого юзера не существует"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(200).json({
                message: 'Пароль некорректен'
            })
        }


        const token = jwt.sign({
            id: user._id,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '30d'})

        res.json({
            token,
            user, 
            message: "Вы вошли в систему"
        })

    } catch (error) {
        res.json({message: "Ошибка авторизации"})
    }
}


//Get me
export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({
                message: "Такого юзера не существует"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        );

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({message: "Access denied"})
    }
}