import axios from "axios";

export const CURRENT_USER = "CURRENT_USER";
export const DATABASE_ERROR = "DATABASE_ERROR";
export const CURRENT_TOKEN = "CURRENT_TOKEN";
export const LOGOUT = "LOGOUT";
export const GET_CLIENT = "GET_CLIENT";
export const GET_POSSIBILITY = "GET_POSSIBILITY";
export const GRAPH_TOGGLE = "GRAPH_TOGGLE";
export const GET_COMPLETED = "GET_COMPLETED";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const NIGHT_MODE = "NIGHT_MODE";

export function nightMode() {
  return { type: NIGHT_MODE };
}

export function getAllClients(allClients) {
  return { type: GET_ALL_CLIENTS, payload: allClients };
}

export function changeCurrentUser(currentUser) {
  return { type: CURRENT_USER, payload: currentUser };
}

export function graphToogle(status) {
  return { type: GRAPH_TOGGLE, payload: status };
}

export function completedToogle(status) {
  return { type: GET_COMPLETED, payload: status };
}

export function writeDatabaseError(databaseError) {
  return { type: DATABASE_ERROR, payload: databaseError };
}

export function changeCurrentToken(token) {
  return { type: CURRENT_TOKEN, payload: token };
}

export function logout() {
  return { type: LOGOUT };
}

export function getPosibility(possibilities) {
  return { type: GET_POSSIBILITY, payload: possibilities };
}

export function changeClient(clients) {
  return { type: GET_CLIENT, payload: clients };
}

export const loginDatabaseCheck = (data) => (dispatch) => {
  axios
    .post("http://localhost:8000/auth/login", data)
    .then((response) => {
      dispatch(changeCurrentUser(response.data.currentUser));
      dispatch(changeCurrentToken(response.data.token));
      dispatch(writeDatabaseError(""));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const getNewClientAPI = (typeformToken, token) => (dispatch) => {
  let config = { headers: { Authorization: `Bearer ${typeformToken}` } };
  console.log(config);
  axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://api.typeform.com/forms/AxeVjYhU/responses?page_size=25",
      config
    )
    .then((response) => {
      console.log(response.data);
      let clients = [];
      for (let i = 0; i < response.data["total_items"]; i++) {
        let client = {};
        client.name = response.data.items[i].answers[0].text;
        client.surname = response.data.items[i].answers[1].text;
        client.citizenshipNo = response.data.items[i].answers[2].text;
        client.sector = response.data.items[i].answers[4].text;
        client.occupation = response.data.items[i].answers[3].text;
        client.workStartYear = response.data.items[i].answers[5].number;
        client.graduate = response.data.items[i].answers[6].text;
        client.probability = 0;
        client.status = "in progress";
        axios
          .post("http://localhost:8000/clients", client, {
            headers: { Authorization: token },
          })
          .then((response) => console.log(response.data))
          .catch((err) => console.log(err));
        clients.push(client);
      }

      dispatch(changeClient(clients));
    })
    .catch((err) => {
      console.log(err);
      dispatch(writeDatabaseError(err.response));
    });
};

export const getClientAPI = (query, token) => (dispatch) => {
  let config;

  if (query.graduate && query.workStartYear) {
    config = {
      headers: { authorization: token },
      params: { graduate: query.graduate, workStartYear: query.workStartYear },
    };
  } else if (!query.graduate && query.workStartYear) {
    config = {
      headers: { authorization: token },
      params: { workStartYear: query.workStartYear },
    };
  } else if (query.graduate && !query.workStartYear) {
    config = {
      headers: { authorization: token },
      params: { graduate: query.graduate },
    };
  } else {
    config = {
      headers: { authorization: token },
      params: {},
    };
  }

  axios
    .get("http://localhost:8000/clients", config)
    .then((response) => {
      dispatch(changeClient(response.data));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const getClientAllSuitableAPI = (token) => (dispatch) => {
  axios
    .get("http://localhost:8000/clients/allsuitable", {
      headers: { authorization: token },
    })
    .then((response) => {
      dispatch(changeClient(response.data));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const getPointAPI = (token) => (dispatch) => {
  axios
    .get("http://localhost:8000/clients/points", {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getPosibility(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const sendClientPipeDrive =
  (pipedriveToken, token, clientId, client, databaseClient) => (dispatch) => {
    axios
      .post(
        `https://aksoy.pipedrive.com/v1/deals?api_token=${pipedriveToken}`,
        client
      )
      .then((response) => {
        axios
          .put(`http://localhost:8000/clients/${clientId}`, databaseClient, {
            headers: { authorization: token },
          })
          .then((response) => {
            console.log(response.data);
            dispatch(changeClient(response.data));
          })
          .catch((err) => {
            console.log(err.response.data.message);
            dispatch(writeDatabaseError(err.response.data.message));
          });
      })
      .catch((err) => {
        dispatch(writeDatabaseError(err.response.data.message));
      });
  };

export const getCompletedClientAPI = (token) => (dispatch) => {
  axios
    .get("http://localhost:8000/clients/completed", {
      headers: { authorization: token },
    })
    .then((response) => {
      dispatch(changeClient(response.data));
      dispatch(completedToogle(true));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const getAllClientAPI = (token) => (dispatch) => {
  axios
    .get("http://localhost:8000/clients/all", {
      headers: { authorization: token },
    })
    .then((response) => {
      dispatch(getAllClients(response.data));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};
