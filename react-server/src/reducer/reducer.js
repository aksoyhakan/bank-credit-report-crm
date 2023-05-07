import {
  CURRENT_USER,
  DATABASE_ERROR,
  CURRENT_TOKEN,
  LOGOUT,
  GET_CLIENT,
  GET_POSSIBILITY,
  GRAPH_TOGGLE,
  GET_COMPLETED,
  GET_ALL_CLIENTS,
  NIGHT_MODE,
} from "./actions";

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
const token = JSON.parse(window.localStorage.getItem("token"));
const nightMode = JSON.parse(window.localStorage.getItem("nightMode"));

const initialState = {
  currentUser: currentUser,
  databaseError: "",
  clients: [],
  token: token,
  possibilities: [],
  graphVisible: false,
  points: [],
  completed: false,
  allClients: [],
  nightMode: nightMode,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload)
      );
      return { ...state, currentUser: action.payload };
    case DATABASE_ERROR:
      return { ...state, databaseError: action.payload };
    case CURRENT_TOKEN:
      window.localStorage.setItem("token", JSON.stringify(action.payload));
      return { ...state, token: action.payload };
    case LOGOUT:
      window.localStorage.setItem("currentUser", JSON.stringify({}));
      window.localStorage.setItem("token", JSON.stringify(""));
      window.localStorage.setItem("nightMode", JSON.stringify(false));
      return {
        ...state,
        token: "",
        currentUser: {},
        clients: [],
        possibilities: [],
        completed: false,
        graphVisible: false,
        allClients: [],
        nightMode: false,
      };
    case GET_CLIENT:
      return { ...state, clients: action.payload };
    case GET_POSSIBILITY:
      return { ...state, possibilities: action.payload };
    case GET_COMPLETED:
      return { ...state, completed: action.payload };
    case GRAPH_TOGGLE:
      return { ...state, graphVisible: action.payload };
    case GET_ALL_CLIENTS:
      return { ...state, allClients: action.payload };
    case NIGHT_MODE:
      window.localStorage.setItem(
        "nightMode",
        JSON.stringify(!state.nightMode)
      );
      return { ...state, nightMode: !state.nightMode };
    default:
      return state;
  }
}

export default reducer;
