import React, { createContext, useContext, useReducer } from "react";
import {
  todoReducer,
  initialState as todoInitialState,
} from "../reducers/TodoReducer";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);

  const actions = {
    addTodo: (text) => {
      dispatch({
        type: TODO_ACTIONS.ADD,
        payload: {
          id: Date.now(),
          text,
          isEditing: false,
          completed: false,
        },
      });
    },

    updateTodo: (id, newText) => {
      dispatch({
        type: TODO_ACTIONS.UPDATE,
        payload: { id, text: newText },
      });
    },

    deleteTodo: (id) => {
      dispatch({
        type: TODO_ACTIONS.DELETE,
        payload: id,
      });
    },

    toggleTodo: (id) => {
      dispatch({
        type: TODO_ACTIONS.TOGGLE,
        payload: id,
      });
    },

    startEdit: (id) => {
      dispatch({
        type: TODO_ACTIONS.START_EDIT,
        payload: id,
      });
    },

    cancelEdit: (id) => {
      dispatch({
        type: TODO_ACTIONS.CANCEL_EDIT,
        payload: id,
      });
    },

    setFilter: (filter) => {
      dispatch({
        type: TODO_ACTIONS.SET_FILTER,
        payload: filter,
      });
    },

    setLoading: (isLoading) => {
      dispatch({
        type: TODO_ACTIONS.SET_LOADING,
        payload: isLoading,
      });
    },

    setError: (errorMessage) => {
      dispatch({
        type: TODO_ACTIONS.SET_ERROR,
        payload: errorMessage,
      });
    },
  };

  const selectors = {
    getTodos: () => {
      switch (state.filter) {
        case "active":
          return state.todos.filter((todo) => !todo.completed);
        case "completed":
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
    getRemainingCount: () =>
      state.todos.filter((todo) => !todo.completed).length,
    getCompletedCount: () =>
      state.todos.filter((todo) => todo.completed).length,
  };

  const value = {
    state,
    actions,
    selectors,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
