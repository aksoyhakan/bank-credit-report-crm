import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import { modifyPriority, updatePriorityAPI } from "../reducer/actions";

function Priority(props) {
  const dispatch = useDispatch();

  const { sectorName, jobName, group, possibility, priorityId } = props.data;
  const nightMode = useSelector((state) => state.nightMode);
  const modifyIndex = useSelector((state) => state.modifyPriority);
  const token = useSelector((state) => state.token);
  const jobs = useSelector((state) => state.jobs);
  const sectors = useSelector((state) => state.sectors);
  const [info, setInfo] = useState({
    sectorName: sectorName,
    jobName: jobName,
    group: group,
    possibility: possibility,
  });

  function handleChange(event) {
    setInfo({ ...info, [event.target.id]: event.target.value });
  }

  function handleEdit() {
    if (modifyIndex === priorityId) {
      dispatch(modifyPriority(0));
    } else {
      dispatch(modifyPriority(priorityId));
    }
  }

  function handleUpdatePriority() {
    let searchedSector = sectors.find(
      (sector) => sector.sectorName === info.sectorName
    );
    let searchedJob = jobs.find((job) => job.jobName === info.jobName);
    dispatch(
      updatePriorityAPI(token, priorityId, {
        sectorId: searchedSector.sectorId,
        jobId: searchedJob.jobId,
        group: info.group,
        possibility: info.possibility,
      })
    );
    dispatch(modifyPriority(0));
  }

  return (
    <div
      className={`w-11/12 mx-auto my-4 border-b-4 overflow-hidden transition-all duration-500 ${
        modifyIndex === priorityId ? "h-36" : "h-12"
      }`}
    >
      <div className="flex justify-between pb-2">
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {priorityId}
        </p>
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {sectorName}
        </p>
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {jobName}
        </p>
        <p
          className={`w-12 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {group}
        </p>
        <p
          className={`w-12 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {possibility}
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
          htmlFor="sectorName"
          className={`block w-18 pt-2 ${
            nightMode ? "text-white" : "text-black"
          } mr-2`}
        >
          Sector Name:
        </label>

        <select onChange={handleChange} name="sectorName" id="sectorName">
          {sectors.map((sector) => (
            <option value={sector.sectorName}>{sector.sectorName}</option>
          ))}
        </select>

        <label
          htmlFor="jobName"
          className={`block w-18 pt-2 ${
            nightMode ? "text-white" : "text-black"
          } mr-2`}
        >
          Occupation Name:
        </label>

        <select onChange={handleChange} name="jobName" id="jobName">
          {jobs.map((sector) => (
            <option value={sector.jobName}>{sector.jobName}</option>
          ))}
        </select>

        <label
          htmlFor="group"
          className={`block w-18 pt-2 ${
            nightMode ? "text-white" : "text-black"
          } mr-2`}
        >
          Group:
        </label>
        <input
          type="text"
          id="group"
          value={info.group}
          onChange={handleChange}
          className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
        />

        <label
          htmlFor="possibility"
          className={`block w-18 pt-2 ${
            nightMode ? "text-white" : "text-black"
          } mr-2`}
        >
          Score:
        </label>
        <input
          type="text"
          id="possibility"
          value={info.possibility}
          onChange={handleChange}
          className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
        />

        <Icon
          name="upload"
          tooltip="modify priority"
          theme={`${nightMode ? "dark" : "light"}`}
          size="small"
          className="w-12"
          onClick={handleUpdatePriority}
        />
      </div>
    </div>
  );
}

export default Priority;
