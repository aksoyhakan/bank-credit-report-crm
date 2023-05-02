import {
  CURRENT_USER,
  DATABASE_ERROR,
  CURRENT_TOKEN,
  LOGOUT,
  GET_CLIENT,
  GET_POSSIBILITY,
  GRAPH_TOGGLE,
} from "./actions";

const initialState = {
  currentUser: {},
  databaseError: "",
  clients: [],
  token: "",
  possibilities: [],
  graphVisible: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case DATABASE_ERROR:
      return { ...state, databaseError: action.payload };
    case CURRENT_TOKEN:
      return { ...state, token: action.payload };
    case LOGOUT:
      return {
        ...state,
        token: "",
        currentUser: {},
        clients: [],
        possibilities: [],
      };
    case GET_CLIENT:
      return { ...state, clients: action.payload };
    case GET_POSSIBILITY:
      return { ...state, possibilities: action.payload };

    case GRAPH_TOGGLE:
      return { ...state, graphVisible: action.payload };
    default:
      return state;
  }
}

export default reducer;
