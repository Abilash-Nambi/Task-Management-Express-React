import React, { useState } from "react";
import Input from "../ReUsableComponents/Input/Input";
import { Box, Button, FormControl, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../ReUsableComponents/Button/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ZoomInTwoToneIcon from "@mui/icons-material/ZoomInTwoTone";

import axios from "axios";
import ToDoList from "../ToDoList/ToDoList";

const Wrapper = styled(Box)(({ theme }) => ({
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .add-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  "& .add-button": {
    position: "absolute",
    top: "24%",
    right: "0%",
  },
  "& .add-filter": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    "& .MuiFormControl-root": {
      marginTop: "5px",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  "& .add-filter-search": {
    position: "absolute",
    top: "0%",
    right: "0%",
    [theme.breakpoints.down("md")]: {
      top: "58%",
      right: "6%",
    },
  },
  "& .add-filter-buttons": {
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      marginBottom: "12px",
    },
  },
}));

const TodoAdd = () => {
  const [toDoList, setToDoList] = useState([]);
  //console.log("🚀 + TodoAdd + toDoList:", toDoList);
  const [toDos, setToDos] = useState("");

  const handleChange = (e) => {
    setToDos(e.target.value);
  };
  const handelAddToDo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        toDo: toDos,
      });
      const res = response.data.data;
      setToDoList((prev) => res);
      setToDos("");
    } catch (err) {
      console.log(err, "errors");
    }
  };

  const toDoSearch = async (e) => {
    const value = e.target.value;
    console.log(value);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
        params: {
          search: value,
        },
      });
      const res = response.data.data;
      setToDoList((prev) => res);
    } catch (err) {
      console.log(err, "errors");
    }
  };
  const handleAllCompleted = async () => {
    toDoList.map(async (res) => {
      if (res.completed == false) {
        const editedToDo = {
          _id: res._id,
          text: res.text,
          completed: true,
        };
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}`, {
            data: editedToDo,
          });
          const upDatedTodo = response.data.data;
          // console.log("🚀 + toDoList.map + res:", upDatedTodo);
          //return upDatedTodo;

          setToDoList((prev) => {
            return prev.map((data) =>
              data._id === res._id ? upDatedTodo : data
            );
          });
        } catch (err) {
          console.log(err, "errors");
        }
      } else return;
    });
  };
  const handleUndoCompleted = () => {
    toDoList.map(async (res) => {
      if (res.completed == true) {
        const editedToDo = {
          _id: res._id,
          text: res.text,
          completed: false,
        };
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}`, {
            data: editedToDo,
          });
          const upDatedTodo = response.data.data;
          setToDoList((prev) => {
            return prev.map((data) =>
              data._id === res._id ? upDatedTodo : data
            );
          });
        } catch (err) {
          console.log(err, "errors");
        }
      } else return;
    });
  };
  return (
    <Wrapper>
      <Box className="add-container">
        <Input
          onChange={(e) => handleChange(e)}
          placeholder={"Add Todo"}
          value={toDos}
        />
        <CustomButton
          color="primary"
          size="large"
          onClick={handelAddToDo}
          className="add-button"
        >
          <AddCircleIcon fontSize="inherit" />
        </CustomButton>
      </Box>
      <Box className="add-filter">
        <Box
          display="flex"
          alignItems="center"
          className="add-filter-buttons"
          gap={2}
        >
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              //value={age}
              //onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
             <FormHelperText>Without label</FormHelperText> 
          </FormControl> */}
          <Button
            className="add-filter-button"
            variant="contained"
            color="secondary"
            onClick={handleAllCompleted}
          >
            Mark all completed
          </Button>
          <Button
            className="add-filter-button"
            variant="contained"
            color="secondary"
            onClick={handleUndoCompleted}
          >
            Mark all uncompleted
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <Input
            size="small"
            placeholder="Search..."
            onChange={(e) => toDoSearch(e)}
          />
          <CustomButton
            color="primary"
            size="large"
            //onClick={}
            className="add-filter-search"
          >
            <ZoomInTwoToneIcon fontSize="inherit" />
          </CustomButton>
        </Box>
      </Box>
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
    </Wrapper>
  );
};

export default TodoAdd;
