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
export const MODIFY_CLIENT = "MODIFY_CLIENT";
export const GET_JOBS = "GET_JOBS";
export const GET_SECTORS = "GET_SECTORS";
export const GET_PRIORITIES = "GET_PRIORITIES";
export const DATA_TOGGLE = "DATA_TOGGLE";
export const MODIFY_JOB = "MODIFY_JOB";
export const MODIFY_SECTOR = "MODIFY_SECTOR";
export const MODIFY_PRIORITY = "MODIFY_PRIORITY";
export const ADD_JOB = "ADD_JOB";
export const ADD_SECTOR = "ADD_SECTOR";
export const ADD_PRIORITY = "ADD_PRIORITY";

export function addJob() {
  return { type: ADD_JOB };
}

export function addSector() {
  return { type: ADD_SECTOR };
}

export function addPriority() {
  return { type: ADD_PRIORITY };
}

export function modifyJob(index) {
  return { type: MODIFY_JOB, payload: index };
}

export function modifySector(index) {
  return { type: MODIFY_SECTOR, payload: index };
}

export function modifyPriority(index) {
  return { type: MODIFY_PRIORITY, payload: index };
}

export function dataToggle(status) {
  return { type: DATA_TOGGLE, payload: status };
}

export function getJobs(jobs) {
  return { type: GET_JOBS, payload: jobs };
}

export function getSectors(sectors) {
  return { type: GET_SECTORS, payload: sectors };
}

export function getPriorities(priorities) {
  return { type: GET_PRIORITIES, payload: priorities };
}

export function nightMode() {
  return { type: NIGHT_MODE };
}

export function modifyClient(index) {
  return { type: MODIFY_CLIENT, payload: index };
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
        /*
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
          });*/
      })
      .catch((err) => {
        dispatch(writeDatabaseError(err.response.data.message));
      });
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

export const updateClientaAPI = (token, clientId, client) => (dispatch) => {
  axios
    .put(`http://localhost:8000/clients/${clientId}`, client, {
      headers: { authorization: token },
    })
    .then((response) => {
      dispatch(getAllClients(response.data));
    })
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const getDataAPI = (token) => (dispatch) => {
  axios
    .get("http://localhost:8000/data/jobs", {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getJobs(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });

  axios
    .get("http://localhost:8000/data/sectors", {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getSectors(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });

  axios
    .get("http://localhost:8000/data/priorities", {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getPriorities(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const addJobAPI = (token, job) => (dispatch) => {
  axios
    .post("http://localhost:8000/data/jobs", job, {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getJobs(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const addSectorAPI = (token, sector) => (dispatch) => {
  axios
    .post("http://localhost:8000/data/sectors", sector, {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getSectors(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const addPriorityAPI = (token, priority) => (dispatch) => {
  axios
    .post("http://localhost:8000/data/priorities", priority, {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getPriorities(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const updateJobAPI = (token, jobId, job) => (dispatch) => {
  axios
    .put(`http://localhost:8000/data/jobs/${jobId}`, job, {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getJobs(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const updateSectorAPI = (token, sectorId, sector) => (dispatch) => {
  axios
    .put(`http://localhost:8000/data/sectors/${sectorId}`, sector, {
      headers: { authorization: token },
    })
    .then((response) => dispatch(getSectors(response.data)))
    .catch((err) => {
      dispatch(writeDatabaseError(err.response.data.message));
    });
};

export const updatePriorityAPI =
  (token, priorityId, priority) => (dispatch) => {
    axios
      .put(`http://localhost:8000/data/priorities/${priorityId}`, priority, {
        headers: { authorization: token },
      })
      .then((response) => dispatch(getPriorities(response.data)))
      .catch((err) => {
        console.log(err.response.data.message);
        dispatch(writeDatabaseError(err.response.data.message));
      });
  };
