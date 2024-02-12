import { styled } from "@mui/material/styles";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../ReUsableComponents/Button/Button";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoneAllTwoToneIcon from "@mui/icons-material/DoneAllTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { completedToDo, deleteTodo, initialFetch } from "../../Redux/todoSlice";
import axios from "axios";
const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),

  "& .MuiPaper-elevation": {
    padding: theme.spacing(3),
  },

  "& .paper-secion": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .paper-secion-icons": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const ToDoList = ({ toDoList, setToDoList }) => {
  const toDoDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:5000/todo", {
        params: {
          toDoId: id,
        },
      });
      const res = response.data.data;
      setToDoList((prev) => res);
    } catch (err) {
      console.log(err, "errors");
    }
  };
  const toDoCompleted = (data) => {
    toDoList.map(async (res) => {
      if (res.id == data) {
        const editedToDo = {
          id: res.id,
          text: res.text,
          completed: !res.completed,
        };
        try {
          const response = await axios.put("http://localhost:5000/todo", {
            data: editedToDo,
          });
          const res = response.data.data;
          setToDoList((prev) => res);
        } catch (err) {
          console.log(err, "errors");
        }
      } else return;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo");
      const res = response.data.data;
      setToDoList((prev) => res);
    } catch (err) {
      console.log(err, "errors");
    }
  };

  return (
    <Wrapper>
      <Typography variant="body2" fontWeight="500" fontSize="20px">
        All your Notes Here..
      </Typography>
      <Box>
        <Stack spacing={2}>
          {toDoList?.map((data, i) => (
            <Paper square="true" elevation={1} className="paper-secion" key={i}>
              {data.completed ? (
                <Box>
                  <s>{data?.text}</s>
                </Box>
              ) : (
                <Box>{data?.text}</Box>
              )}
              <Box className="paper-secion-icons">
                <CustomButton
                  color="error"
                  size="large"
                  onClick={() => toDoDelete(data.id)}
                >
                  <DeleteTwoToneIcon fontSize="inherit" />
                </CustomButton>
                <CustomButton
                  color="success"
                  size="large"
                  onClick={() => toDoCompleted(data.id)}
                >
                  <DoneAllTwoToneIcon fontSize="inherit" />
                </CustomButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default ToDoList;
