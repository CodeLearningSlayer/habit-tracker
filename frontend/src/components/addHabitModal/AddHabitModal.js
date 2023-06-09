import { Button, Modal, Typography, Box, TextField, Fade, Backdrop, Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appendHabit, modifyHabit } from '../../store/slices/habitsSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    zIndex: 5,
    height: "auto",
    bgcolor: '#423B3B',
    border: '1px solid #fefefe',
    boxShadow: 24,
    p: 4,
    borderRadius: "17px",
  };

const inputStyle = {
    display: "block",
    mb: "10px",
    "& .MuiOutlinedInput-root": {
        color:"#fff",
        width: "100%",
        "& > fieldset": { borderColor: "#EFEFEF", borderWidth: "1px", transition: "all .3s" },
    },
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
          borderColor: "#fff !important"
        }
    },
    "& .MuiFormLabel-root":{
        color: "#fff !important"
      },
}

const AddHabitModal = ({isModalOpen, setIsModalOpen, filters, habit, mode, editHabit}) => {

    const dispatch = useDispatch(state => state.habits.habits);
    // const addOneHabit =
    const [nameOfHabit, setNameOfHabit] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(filters[0]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        console.log(mode.current);
        mode.current === "edit" ? (() => {
            setNameOfHabit(habit.name); 
            setDescription(habit.description);
            setSelectedFilter(habit.filter);
        })() : (() => {
            setNameOfHabit(""); 
            setDescription("");
            setSelectedFilter("");
        })()
    }, [habit, mode.current]);

    const handleNameChange = (e) => {
        setNameOfHabit(e.target.value)
    }

    const handleFilterInputChange = (e, newInputValue) => {
        setInputValue(newInputValue)
    }

    const handleFilterChange = (e, newValue) => {
        setSelectedFilter(newValue)
    }

    const handleDecriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} 
        sx={{alignItems:"center", justifyContent:"center"}}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
            <Fade in={isModalOpen}>
                    <Box sx={style}>
                        <Typography variant="h5" sx={{textAlign:"center", 
                            color: "#fefefe",
                            fontFamily:"Rubik, sans-serif",
                            mb: "15px"}}>{mode.current === "creating" ? "Create a new habbit" : "Edit habbit"}</Typography>
                        <TextField onChange={handleNameChange} value={nameOfHabit} sx={inputStyle} label={"Название привычки"}/>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            onChange={handleFilterChange}
                            onInputChange={handleFilterInputChange}
                            freeSolo
                            options={filters}
                            value={selectedFilter}
                            inputValue={inputValue}
                            sx={{width: "100%", 
                            color: "#fff",
                            mb: "10px",
                            "& fieldset": {
                                borderColor: "#fff"
                            },
                            "& .MuiFormLabel-root":{
                                color: "#fff"
                            },
                            
                            "& .MuiOutlinedInput-root": {
                                color:"#fff",
                                width: "100%",
                                "& > fieldset": { borderColor: "#EFEFEF", borderWidth: "1px", transition: "all .3s" },
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                  borderColor: "#fff !important"
                                }
                            },
                            }}
                            
                            renderInput={(params) => <TextField {...params} label="Фильтр" />}
                            />
                        <TextField multiline value={description} onChange={handleDecriptionChange} rows={2} sx={inputStyle} label={"Описание привычки"}/>
                        <Button onClick={() => {
                            mode.current === "creating" ?
                            (() => dispatch(appendHabit({
                                name: nameOfHabit,
                                description,
                                filter: inputValue,
                                isCompleted: false
                                })
                            ))()
                                : 
                            (() => {
                                dispatch(modifyHabit({
                                    name: nameOfHabit,
                                    description,
                                    filter: inputValue,
                                    habitId: habit._id
                                }))
                            })()
                            setIsModalOpen(false)
                        }} sx={{
                            m: "0 auto",
                        borderWidth: "2px",
                        borderColor: "#fff",
                        borderRadius: "20px",
                        color: '#fff', 
                        background: 'linear-gradient(120.37deg, rgba(221, 122, 5, 0.8) 0%, rgba(236, 25, 164, 0.8) 100%);',
                        width:"100%",
                        height: "45px",
                        fontSize: "20px",
                        fontFamily: "Noto Sans, sans-serif"}}>
                            {mode.current === "creating" ? "Добавить привычку" : "Изменить привычку"}
                            </Button>
                    </Box>
                
                </Fade>
                
           

        </Modal>
    );
};

export default AddHabitModal;