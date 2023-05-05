import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendClientPipeDrive, graphToogle } from "../reducer/actions";

function Client(props) {
  const { data, line } = props;
  const token = useSelector((state) => state.token);
  const possibilities = useSelector((state) => state.possibilities);
  const [point, setPoint] = useState(null);
  const rolename = useSelector((state) => state.currentUser.rolename);
  const completed = useSelector((state) => state.completed);

  const pipedriveToken = useSelector(
    (state) => state.currentUser.pipedriveToken
  );
  const dispatch = useDispatch();
  console.log(pipedriveToken);

  function handleClick(event) {
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

    dispatch(
      sendClientPipeDrive(
        pipedriveToken,
        token,
        data.clientId,
        newClient,
        newClient2
      )
    );

    setTimeout(() => dispatch(graphToogle(true)), 550);
  }

  return (
    <div className="flex justify-between mx-16 my-4 border-b-4 pb-4">
      <p className="w-2">{line}</p>
      <p className="w-16">{data.name}</p>
      <p className="w-16">{data.surname}</p>
      <p className="w-16">{data.occupation}</p>
      <p className="w-16">{data.workStartYear}</p>
      <p className="w-8">{data.graduate}</p>
      {completed && <p className="w-8">{data.status}</p>}
      {!completed && (
        <input type="text" className="w-8 text-right" value={point}></input>
      )}
      {!completed && (
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          type="submit"
          className="w-20 rounded-lg bg-slate-300"
          disabled={rolename !== "süper yönetici"}
        >
          Hesapla
        </button>
      )}
    </div>
  );
}

export default Client;
