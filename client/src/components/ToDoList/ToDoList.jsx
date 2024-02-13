import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../ReUsableComponents/Button/Button";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoneAllTwoToneIcon from "@mui/icons-material/DoneAllTwoTone";
import EditSharpIcon from "@mui/icons-material/EditSharp";

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
  const [statusOfInput, setStatusofInpuut] = useState({
    status: false,
    toDoId: 0,
  });
  const [editedToDo, setEditedToDo] = useState("");

  console.log(toDoList, "toDoList");

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

  const toDoEdit = (id, text) => {
    setEditedToDo(text);
    setStatusofInpuut((prev) => ({
      ...prev,
      status: !prev.status,
      toDoId: id,
    }));
  };
  const handleChange = (e) => {
    setEditedToDo(e.target.value);
  };
  const handleSubmit = async (data) => {
    toDoList.map(async (res) => {
      if (res.id == data) {
        const newToDo = {
          id: res.id,
          text: editedToDo,
          completed: res.completed,
        };
        try {
          const response = await axios.put("http://localhost:5000/todo", {
            data: newToDo,
          });
          const res = response.data.data;
          setToDoList((prev) => res);
          setStatusofInpuut((prev) => !prev.status);
        } catch (err) {
          console.log(err, "errors");
        }
      } else return;
    });
  };
  return (
    <Wrapper>
      <Typography variant="body2" fontWeight="500" fontSize="20px">
        All your Notes Here..
      </Typography>
      <Box>
        <Stack spacing={2}>
          {toDoList?.map((data, i) => (
            <Paper elevation={1} className="paper-secion" key={i}>
              {data.completed ? (
                <Box>
                  <s>{data?.text}</s>
                </Box>
              ) : (
                <Box>
                  {statusOfInput.status && statusOfInput.toDoId === data.id ? (
                    <TextField
                      id="standard-basic"
                      //label="Standard"
                      variant="standard"
                      value={editedToDo}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  ) : (
                    data?.text
                  )}
                </Box>
              )}
              <Box>
                {statusOfInput.status && statusOfInput.toDoId === data.id ? (
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => handleSubmit(data.id)}
                      sx={{ marginRight: "10px" }}
                    >
                      save
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() =>
                        setStatusofInpuut((prev) => ({
                          ...prev,
                          status: !prev.status,
                        }))
                      }
                    >
                      cancel
                    </Button>
                  </Box>
                ) : (
                  <Box className="paper-secion-icons">
                    <CustomButton
                      color="primary"
                      size="large"
                      onClick={() => toDoEdit(data.id, data.text)}
                    >
                      <EditSharpIcon fontSize="inherit" />
                    </CustomButton>
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
                )}
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default ToDoList;
