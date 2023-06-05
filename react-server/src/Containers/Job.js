import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import { modifyJob, updateJobAPI } from "../reducer/actions";

function Job(props) {
  const dispatch = useDispatch();

  const { jobId, jobName } = props.data;
  const nightMode = useSelector((state) => state.nightMode);
  const modifyIndex = useSelector((state) => state.modifyJob);
  const token = useSelector((state) => state.token);
  const [occupation, setOccupation] = useState(jobName);

  function handleChange(e) {
    setOccupation(e.target.value);
  }

  function handleEdit() {
    if (modifyIndex === jobId) {
      dispatch(modifyJob(0));
    } else {
      dispatch(modifyJob(jobId));
    }
  }

  function handleUpdateJob() {
    dispatch(updateJobAPI(token, jobId, { jobName: occupation }));
    dispatch(modifyJob(0));
  }

  return (
    <div
      className={`w-72 mx-auto my-4 border-b-4 overflow-hidden transition-all duration-500 ${
        modifyIndex === jobId ? "h-36" : "h-12"
      }`}
    >
      <div className="flex justify-between pb-2">
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {jobId}
        </p>
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {jobName}
        </p>
        <Icon
          name="edit"
          tooltip="Edit"
          theme={`${nightMode ? "dark" : "light"}`}
          size="small"
          className="w-8"
          onClick={handleEdit}
        />
      </div>
      <div className="flex justify-around pb-2 mt-4">
        <label
          htmlFor="jobName"
          className={`block w-18 pt-2 ${
            nightMode ? "text-white" : "text-black"
          } mr-2`}
        >
          Occupation Name:
        </label>
        <input
          type="text"
          value={occupation}
          onChange={handleChange}
          className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
        />
        <Icon
          name="upload"
          tooltip="modify job"
          theme={`${nightMode ? "dark" : "light"}`}
          size="small"
          className="w-12"
          onClick={handleUpdateJob}
        />
      </div>
    </div>
  );
}

export default Job;
