import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  TODO_ACTIONS,
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

  // Action creators avec mise à jour optimiste
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

    // TODO: Ajoutez les autres méthodes pour les actions définies dans le reducer
  };

  // Sélecteurs (computed values)
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
  };

  const value = {
    state,
    actions,
    selectors,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
