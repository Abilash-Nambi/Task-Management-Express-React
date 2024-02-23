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
  const [statusOfInput, setStatusofInput] = useState({
    status: false,
    toDoId: 0,
  });
  console.log(statusOfInput);

  const [editedToDo, setEditedToDo] = useState("");

  const toDoDelete = async (_id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}`, {
        params: {
          toDoId: _id,
        },
      });
      const res = response.data.data;
      setToDoList((prev) => res);
    } catch (err) {
      console.log(err, "errors");
    }
  };
  const toDoCompleted = (data) => {
    toDoList?.map(async (res) => {
      if (res._id == data) {
        const editedToDo = {
          _id: res._id,
          text: res.text,
          completed: !res.completed,
        };
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}`, {
            data: editedToDo,
          });
          const res = response.data.data;

          setToDoList((prev) => {
            return prev.map((data) => (data._id === res._id ? res : data));
          });
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      const res = response.data.data;
      // console.log("🚀 + fetchData + res:", res);
      setToDoList((prev) => res);
    } catch (err) {
      console.log(err, "errors");
    }
  };

  const toDoEdit = (_id, text) => {
    setEditedToDo(text);
    setStatusofInput((prev) => ({
      ...prev,
      status: !prev.status,
      toDoId: _id,
    }));
  };
  const handleChange = (e) => {
    setEditedToDo(e.target.value);
  };
  const handleSubmit = async (data) => {
    toDoList.map(async (res) => {
      if (res._id == data) {
        const newToDo = {
          _id: res._id,
          text: editedToDo,
          completed: res.completed,
        };
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}`, {
            data: newToDo,
          });
          const res = response.data.data;

          setToDoList((prev) => {
            return prev.map((data) => (data._id === res._id ? res : data));
          });
          setStatusofInput((prev) => !prev.status);
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
              {/* {data?.completed ? (
                <Box>
                  <s>{data?.text}</s>
                </Box>
              ) : (
                <Box>
                  {statusOfInput.status && statusOfInput.toDoId === data._id ? (
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
              )} */}

              {data?.completed ? (
                <Box>
                  <s>{data?.text}</s>
                </Box>
              ) : (
                <Box>
                  {statusOfInput.status && statusOfInput.toDoId === data._id ? (
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
                {data.completed === false &&
                statusOfInput.status &&
                statusOfInput.toDoId === data._id ? (
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => handleSubmit(data._id)}
                      sx={{ marginRight: "10px" }}
                    >
                      save
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() =>
                        setStatusofInput((prev) => ({
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
                    {data.completed === false && (
                      <>
                        <CustomButton
                          color="primary"
                          size="large"
                          onClick={() => toDoEdit(data._id, data.text)}
                        >
                          <EditSharpIcon fontSize="inherit" />
                        </CustomButton>
                      </>
                    )}

                    <CustomButton
                      color="error"
                      size="large"
                      onClick={() => toDoDelete(data._id)}
                    >
                      <DeleteTwoToneIcon fontSize="inherit" />
                    </CustomButton>
                    <CustomButton
                      color="success"
                      size="large"
                      onClick={() => toDoCompleted(data._id)}
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
