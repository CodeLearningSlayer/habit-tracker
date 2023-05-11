import React from 'react';
import "./addHabitForm.scss"

const AddHabitForm = () => {
    return (
        <form className="habit-form">
            <input className='habit-form__input' placeholder='Введите название привычки'/>
            <textarea className='habit-form__input' placeholder='Введите описание привычки'/>
            <button className='habit-form__btn'>Добавить привычку</button>
        </form>
    );
};

export default AddHabitForm;