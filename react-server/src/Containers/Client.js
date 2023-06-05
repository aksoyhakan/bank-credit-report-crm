import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendClientPipeDrive,
  graphToogle,
  modifyClient,
  updateClientaAPI,
} from "../reducer/actions";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Client(props) {
  const history = useHistory();
  const { data, line } = props;
  const token = useSelector((state) => state.token);
  const possibilities = useSelector((state) => state.possibilities);
  const rolename = useSelector((state) => state.currentUser.rolename);
  const completed = useSelector((state) => state.completed);
  const nightMode = useSelector((state) => state.nightMode);
  const modifyClientIndex = useSelector((state) => state.modifyClient);
  const pipedriveToken = useSelector(
    (state) => state.currentUser.pipedriveToken
  );
  const [point, setPoint] = useState(null);
  const [modify, setModify] = useState({
    name: data.name,
    surname: data.surname,
    citizenshipNo: data.citizenshipNo,
    sector: data.sector,
    occupation: data.occupation,
    workStartYear: data.workStartYear,
    graduate: data.graduate,
  });

  const dispatch = useDispatch();
  console.log(pipedriveToken);

  function handleSendPipeDrive(event) {
    event.preventDefault();
    let searched = possibilities.find(
      (possibility) => possibility.jobName === data.occupation
    );

    setPoint(searched.possibility);
    let newClient = {
      title: data.name + " " + data.surname,
      value: 50000 + Math.floor(Math.random() * 10000),
      currency: "TRY",
      user_id: 14705558,
      person_id: 3,
      org_id: 3,
      pipeline_id: 1,
      stage_id: 1,
      status: "open",
      expected_close_date: "2023-05-24",
      probability: searched.possibility,
      lost_reason: null,
      visible_to: "3",
      add_time: new Date().toLocaleString(),
    };

    let newClient2 = {
      ...data,
      status: "completed",
      probability: searched.possibility,
    };

    Swal.fire({
      title: "Are you sending to Pipedrive?",
      text: `${newClient2.name} ${newClient2.surname} credit score is ${newClient2.probability}. Are you sure to send?  You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send to Pipedrive!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          sendClientPipeDrive(
            pipedriveToken,
            token,
            data.clientId,
            newClient,
            newClient2
          )
        );

        Swal.fire("Succesful", "Sending to Pipedrive is done", "success");
      }
    });

    setTimeout(() => {
      history.push("/");
    }, 500);
  }

  function handleModifyToogle() {
    modifyClientIndex == line
      ? dispatch(modifyClient(0))
      : dispatch(modifyClient(line));
  }

  function handleChange(event) {
    setModify({ ...modify, [event.target.id]: event.target.value });
  }

  function handleUpdateClient() {
    Swal.fire({
      title: "Are you sure to change data?",
      text: `${modify.name} ${modify.surname} info will be changed in database. You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it in database!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateClientaAPI(token, data.clientId, modify));

        Swal.fire(
          "Changed!",
          `${modify.name} ${modify.surname} info has been changed in database`,
          "success"
        );
      }
    });
  }

  return (
    <div
      className={`border-b-4 mx-16 my-4 pr-8 overflow-hidden transition-all duration-500 ${
        modifyClientIndex == line && !completed ? "h-36" : "h-12"
      } `}
    >
      <div className="flex justify-between pb-4">
        <p className={`w-2 ${nightMode ? "text-white" : "text-black"}`}>
          {line}
        </p>
        <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
          {data.name}
        </p>
        <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
          {data.surname}
        </p>
        <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
          {data.occupation}
        </p>
        <p className={`w-20 ${nightMode ? "text-white" : "text-black"}`}>
          {data.workStartYear}
        </p>
        <p className={`w-12 ${nightMode ? "text-white" : "text-black"}`}>
          {data.graduate}
        </p>

        {completed && (
          <p className={`w-12 ${nightMode ? "text-white" : "text-black"}`}>
            {data.status}
          </p>
        )}

        {!completed && rolename === "süper yönetici" && (
          <Icon
            name="edit"
            tooltip="Edit"
            theme={`${nightMode ? "dark" : "light"}`}
            size="small"
            className="w-8"
            onClick={handleModifyToogle}
          />
        )}
        {!completed && rolename === "süper yönetici" && (
          <Icon
            name="export"
            tooltip="Export to Pipedrive"
            theme={`${nightMode ? "dark" : "light"}`}
            size="small"
            className="w-12"
            onClick={handleSendPipeDrive}
          />
        )}
      </div>
      {!completed && (
        <div className="flex justify-between align-middle pb-4">
          <label
            htmlFor="name"
            className={`block w-11 pt-2 ${
              nightMode ? "text-white" : "text-black"
            } mr-2`}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={modify.name}
            className="w-28 block py-0 border-solid border-2 border-black-900 px-2"
            onChange={handleChange}
          />
          <label
            htmlFor="surname"
            className={`w-16 block mr-2 pt-2 ${
              nightMode ? "text-white" : "text-black"
            }`}
          >
            Surname:{" "}
          </label>
          <input
            type="text"
            id="surname"
            value={modify.surname}
            className="w-28 block py-0 border-solid border-2 border-black-900 px-2"
            onChange={handleChange}
          />
          <label
            htmlFor="occupation"
            className={`w-20 block mr-2 pt-2 ${
              nightMode ? "text-white" : "text-black"
            }`}
          >
            Occupation:{" "}
          </label>
          <input
            type="text"
            id="occupation"
            value={modify.occupation}
            className="w-28 block py-0 border-solid border-2 border-black-900 px-2"
            onChange={handleChange}
          />
          <label
            htmlFor="workStartYear"
            className={`w-6 block mr-2 pt-2 ${
              nightMode ? "text-white" : "text-black"
            }`}
          >
            Year:
          </label>
          <input
            type="text"
            id="workStartYear"
            value={modify.workStartYear}
            className="w-28 block py-0 border-solid border-2 border-black-900 px-2"
            onChange={handleChange}
          />
          <label
            htmlFor="graduate"
            className={`w-16 block mr-2 pt-2  ${
              nightMode ? "text-white" : "text-black"
            }`}
          >
            Graduate:{" "}
          </label>
          <input
            type="text"
            id="graduate"
            value={modify.graduate}
            className="w-28 block py-0 border-solid border-2 border-black-900 px-2"
            onChange={handleChange}
          />

          <Icon
            name="upload"
            tooltip="modify client"
            theme={`${nightMode ? "dark" : "light"}`}
            size="small"
            className="w-12"
            onClick={handleUpdateClient}
          />
        </div>
      )}
    </div>
  );
}

export default Client;
