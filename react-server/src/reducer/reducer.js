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
  MODIFY_CLIENT,
  GET_JOBS,
  GET_SECTORS,
  GET_PRIORITIES,
  DATA_TOGGLE,
  MODIFY_JOB,
  MODIFY_PRIORITY,
  MODIFY_SECTOR,
  ADD_JOB,
  ADD_SECTOR,
  ADD_PRIORITY,
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
  modifyClient: 0,
  jobs: [],
  sector: [],
  priorities: [],
  data: false,
  modifyJob: 0,
  modifySector: 0,
  modifyPriority: 0,
  addJob: false,
  addSector: false,
  addPriority: false,
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
        modifyClient: 0,
        jobs: [],
        sector: [],
        priorities: [],
        data: false,
        modifyJob: 0,
        modifySector: 0,
        modifyPriority: 0,
        addJob: false,
        addSector: false,
        addPriority: false,
      };
    case GET_CLIENT:
      return { ...state, clients: action.payload };
    case GET_POSSIBILITY:
      return { ...state, possibilities: action.payload };
    case GET_COMPLETED:
      return { ...state, completed: action.payload };
    case GRAPH_TOGGLE:
      return { ...state, graphVisible: action.payload };
    case DATA_TOGGLE:
      return { ...state, data: action.payload };
    case GET_ALL_CLIENTS:
      return { ...state, allClients: action.payload };
    case NIGHT_MODE:
      window.localStorage.setItem(
        "nightMode",
        JSON.stringify(!state.nightMode)
      );
      return { ...state, nightMode: !state.nightMode };
    case MODIFY_CLIENT:
      return { ...state, modifyClient: action.payload };
    case MODIFY_JOB:
      return { ...state, modifyJob: action.payload };
    case MODIFY_SECTOR:
      return { ...state, modifySector: action.payload };
    case MODIFY_PRIORITY:
      return { ...state, modifyPriority: action.payload };
    case GET_JOBS:
      return { ...state, jobs: action.payload };
    case GET_SECTORS:
      return { ...state, sectors: action.payload };
    case GET_PRIORITIES:
      return { ...state, priorities: action.payload };
    case ADD_JOB:
      return { ...state, addJob: !state.addJob };
    case ADD_SECTOR:
      return { ...state, addSector: !state.addSector };
    case ADD_PRIORITY:
      return { ...state, addPriority: !state.addPriority };
    default:
      return state;
  }
}

export default reducer;
