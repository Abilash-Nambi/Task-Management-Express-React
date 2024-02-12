import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const INITIAL_STATE = {
  toDo: [],
  toDoSearch: "",
  filterResult: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.toDo.push(newTodo);
    },

    deleteTodo: (state, action) => {
      let filteredTodo = state.toDo.filter(
        (data) => data.id !== action.payload
      );
      state.toDo = filteredTodo;
    },

    searchToDo: (state, action) => {
      state.toDoSearch = action.payload;
      console.log(state.toDoSearch, "search");

      let newResult = state.toDo.filter((data) =>
        data.text.toLowerCase().includes(state.toDoSearch)
      );
      state.filterResult = newResult;
    },

    completedToDo: (state, action) => {
      let todo = state.toDo.filter((data) =>
        data.id === action.payload
          ? { ...(data.completed = !data.completed) }
          : state.toDo
      );
      state.toDo = todo;
    },

    AllToDoCompleted: (state, action) => {
      let todo = state.toDo.filter((data) =>
        action.payload ? { ...(data.completed = true) } : state.toDo
      );
      state.toDo = todo;
    },
    AllUndoCompleted: (state, action) => {
      let todo = state.toDo.filter((data) =>
        action.payload ? { ...(data.completed = false) } : state.toDo
      );
      state.toDo = todo;
    },

    initialFetch: (state, action) => {
      state.toDo = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  searchToDo,
  completedToDo,
  AllToDoCompleted,
  AllUndoCompleted,
  initialFetch,
} = todoSlice.actions;
export default todoSlice.reducer;
