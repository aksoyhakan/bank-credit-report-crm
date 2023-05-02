import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendClientPipeDrive } from "../reducer/actions";

function Client(props) {
  const { data, line } = props;
  const token = useSelector((state) => state.token);
  const possibilities = useSelector((state) => state.possibilities);

  const pipedriveToken = useSelector(
    (state) => state.currentUser.pipedriveToken
  );
  const dispatch = useDispatch();
  console.log(pipedriveToken);
  const [point, setPoint] = useState(null);

  function handleClick() {
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

    dispatch(
      sendClientPipeDrive(pipedriveToken, token, data.clientId, newClient)
    );
  }

  return (
    <div className="flex justify-between mx-16 my-4">
      <p className="w-2">{line}</p>
      <p className="w-16">{data.name}</p>
      <p className="w-16">{data.surname}</p>
      <p className="w-32"> {data.citizenshipNo}</p>
      <p className="w-16">{data.occupation}</p>
      <p className="w-16">{data.workStartYear}</p>
      <p className="w-8">{data.graduate}</p>
      <input value={point} type="text" className="w-8 text-right"></input>
      <button onClick={handleClick} type="button" className="w-8">
        Hesapla
      </button>
    </div>
  );
}

export default Client;
