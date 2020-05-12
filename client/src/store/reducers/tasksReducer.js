import type from "../actions/types";

const initState = {
  isLoading: true,
  isError: false,
  message: "",
  tasks: [],
  task: {},
};

const tasksReducer = (state = initState, action) => {
  switch (action.type) {
    case type.GET_TASKS_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "Initialization fetching data...",
      };
    case type.GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: "Fetching tasks successfully",
        tasks: action.tasks,
      };
    case type.GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: "Something went wrong...",
      };
    case type.DELETE_TASK:
      return {
        ...state,
        message: `Deleted task with id ${action.id} successfully`,
        tasks: state.tasks.filter((task) => task._id !== action.id),
      };
    case type.DELETE_TASK_ERROR:
      return {
        ...state,
        message: `deleted task with id ${action.id} failed`,
      };
    case type.CREATE_TASK_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "It takes few seconds, i think so.",
      };
    case type.CREATE_TASK:
      //
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasks: [...state.tasks, action.task],
        message: "Add task successfully",
      };
    case type.CREATE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: "Created task failed",
      };
    case type.EDIT_TASK_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "Editing task, please wait.",
      };
    case type.EDIT_TASK:
      const inx = state.tasks.findIndex((task) => task._id === action.task._id);
      state.tasks[inx] = action.task;
      return {
        ...state,
        isLoading: false,
        isError: false,
        task: action.task,
        message: action.message,
      };
    case type.EDIT_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case type.GET_TASK_BY_ID_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "Loading task. It takes few seconds, I think so",
      };
    case type.GET_TASK_BY_ID:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: "Task uploaded successfully",
        task: action.task,
      };
    case type.GET_TASK_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: "Task uploaded failed",
      };
    case type.FINISH_TASK:
      const i = state.tasks.findIndex((task) => task._id === action.task._id);
      state.tasks[i] = action.task;
      return {
        ...state,
        message: action.message,
      };
    case type.FINISH_TASK_ERROR:
      return state;
    case type.CLEAR_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export default tasksReducer;
