export const TODO_ACTIONS = {
  ADD: "ADD"
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  START_EDIT: "START_EDIT",
  CANCEL_EDIT: "CANCEL_EDIT",
  SET_TODOS: "SET_TODOS",
  SET_FILTER: "SET_FILTER",
  // etc.
};



export const initialState = {
  todos: [
    { id: 1, text: "Todo 1", isEditing: false, completed: true },
    { id: 2, text: "Todo 2", isEditing: false, completed: false },
    { id: 3, text: "Todo 3", isEditing: false, completed: false },
  ],
  filter: "all", // all, active, completed
};


export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TODO_ACTIONS.UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, isEditing: false }
            : todo
        ),
      };

    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.START_EDIT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isEditing: true } : todo
        ),
      };

    case TODO_ACTIONS.CANCEL_EDIT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isEditing: false } : todo
        ),
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload, 
      };

    case TODO_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case TODO_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
