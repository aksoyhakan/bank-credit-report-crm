import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Job from "./Job";
import Sector from "./Sector";
import Priority from "./Priority";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import {
  addJob,
  addSector,
  addJobAPI,
  addSectorAPI,
  addPriority,
  addPriorityAPI,
} from "../reducer/actions";

function Data() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const sectors = useSelector((state) => state.sectors);
  const priorities = useSelector((state) => state.priorities);
  const nightMode = useSelector((state) => state.nightMode);
  const addJobStatus = useSelector((state) => state.addJob);
  const addSectorStatus = useSelector((state) => state.addSector);
  const addPriorityStatus = useSelector((state) => state.addPriority);
  const token = useSelector((state) => state.token);
  const [occupation, setOccupation] = useState("");
  const [sector, setSector] = useState("");
  const [occupation2, setOccupation2] = useState("");
  const [sector2, setSector2] = useState("");
  const [score, setScore] = useState("");
  const [group, setGroup] = useState("");

  function handleChangeOccupation(e) {
    setOccupation(e.target.value);
  }

  function handleChangeGroup(e) {
    setGroup(e.target.value);
  }

  function handleChangeScore(e) {
    setScore(e.target.value);
  }

  function handleChangeOccupation2(e) {
    setOccupation2(e.target.value);
  }

  function handleChangeSector(e) {
    setSector(e.target.value);
  }

  function handleChangeSector2(e) {
    setSector2(e.target.value);
  }

  function handleAddJob() {
    dispatch(addJob());
  }
  function handleAddSector() {
    dispatch(addSector());
  }

  function handleAddPriority() {
    dispatch(addPriority());
  }

  function handleSendJob() {
    dispatch(addJob());
    dispatch(addJobAPI(token, { jobName: occupation }));
    setOccupation("");
  }

  function handleSendSector() {
    dispatch(addSector());
    dispatch(addSectorAPI(token, { sectorName: sector }));
    setSector("");
  }

  function handleSendPriority() {
    let searchedSector = sectors.find(
      (sector) => sector.sectorName === sector2
    );
    let searchedJob = jobs.find((job) => job.jobName === occupation2);
    dispatch(
      addPriorityAPI(token, {
        sectorId: searchedSector.sectorId,
        jobId: searchedJob.jobId,
        group: group,
        possibility: score,
      })
    );
    dispatch(addPriority());
    setOccupation2("");
    setSector2("");
    setScore("");
    setGroup("");
  }

  return (
    <div>
      <div className="flex justify-between w-144 mx-auto my-4 border-b-4 pb-4">
        <div className="w-72 mx-auto my-6 text-center">
          <h2
            className={`text-center ${
              nightMode ? "text-white" : "text-black"
            } text-center text-xl font-bold`}
          >
            Job Table
          </h2>
          <div className="flex justify-between w-72 mx-auto my-4 border-b-4 pb-4">
            <p
              className={`w-24 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Job Id
            </p>
            <p
              className={`w-24 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Job Name
            </p>
            <p
              className={`w-12 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Edit
            </p>
          </div>
          {jobs.map((item, index) => (
            <Job data={item} key={index} />
          ))}
          <Icon
            name="add"
            tooltip="add job"
            theme={`${nightMode ? "dark" : "light"}`}
            size="small"
            className="w-12"
            onClick={handleAddJob}
          />
          {addJobStatus && (
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
                onChange={handleChangeOccupation}
                id="jobName"
                className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
              />
              <Icon
                name="save"
                tooltip="save job"
                theme={`${nightMode ? "dark" : "light"}`}
                size="small"
                className="w-12"
                onClick={handleSendJob}
              />
            </div>
          )}
        </div>

        <div className="w-72 mx-auto my-6 text-center">
          <h2
            className={`text-center ${
              nightMode ? "text-white" : "text-black"
            } text-center text-xl font-bold`}
          >
            Sector Table
          </h2>
          <div className="flex justify-between w-72 mx-auto my-4 border-b-4 pb-4">
            <p
              className={`w-24 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Sector Id
            </p>
            <p
              className={`w-24 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Sector Name
            </p>
            <p
              className={`w-12 ${
                nightMode ? "text-white" : "text-black"
              } text-center`}
            >
              Edit
            </p>
          </div>
          {sectors.map((item, index) => (
            <Sector data={item} key={index} />
          ))}
          <Icon
            name="add"
            tooltip="add sector"
            theme={`${nightMode ? "dark" : "light"}`}
            size="small"
            className="w-12"
            onClick={handleAddSector}
          />
          {addSectorStatus && (
            <div className="flex justify-around pb-2 mt-4">
              <label
                htmlFor="sectorName"
                className={`block w-18 pt-2 ${
                  nightMode ? "text-white" : "text-black"
                } mr-2`}
              >
                Sector Name:
              </label>
              <input
                type="text"
                id="sectorName"
                value={sector}
                onChange={handleChangeSector}
                className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
              />
              <Icon
                name="save"
                tooltip="save sector"
                theme={`${nightMode ? "dark" : "light"}`}
                size="small"
                className="w-12"
                onClick={handleSendSector}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-11/12 mx-auto my-6 text-center">
        <h2
          className={`text-center ${
            nightMode ? "text-white" : "text-black"
          } text-center text-xl font-bold`}
        >
          Score Table
        </h2>
        <div className="flex justify-between w-11/12 mx-auto my-4 border-b-4 pb-4">
          <p
            className={`w-24 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Priority Id
          </p>
          <p
            className={`w-24 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Sector Name
          </p>
          <p
            className={`w-24 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Job Name
          </p>
          <p
            className={`w-12 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Group
          </p>
          <p
            className={`w-12 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Score
          </p>
          <p
            className={`w-12 ${
              nightMode ? "text-white" : "text-black"
            } text-center`}
          >
            Edit
          </p>
        </div>
        {priorities.map((item, index) => (
          <Priority data={item} key={index} />
        ))}
        <Icon
          name="add"
          tooltip="add priority"
          theme={`${nightMode ? "dark" : "light"}`}
          size="small"
          className="w-12"
          onClick={handleAddPriority}
        />
        {addPriorityStatus && (
          <div className="flex justify-around pb-2 mt-4">
            <label
              htmlFor="sectorName2"
              className={`block w-18 pt-2 ${
                nightMode ? "text-white" : "text-black"
              } mr-2`}
            >
              Sector Name:
            </label>
            <input
              type="text"
              id="sectorName2"
              value={sector2}
              onChange={handleChangeSector2}
              className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
            />
            <label
              htmlFor="jobName2"
              className={`block w-18 pt-2 ${
                nightMode ? "text-white" : "text-black"
              } mr-2`}
            >
              Job Name:
            </label>
            <input
              type="text"
              id="jobName2"
              value={occupation2}
              onChange={handleChangeOccupation2}
              className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
            />
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
              value={group}
              onChange={handleChangeGroup}
              className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
            />
            <label
              htmlFor="score"
              className={`block w-18 pt-2 ${
                nightMode ? "text-white" : "text-black"
              } mr-2`}
            >
              Score:
            </label>
            <input
              type="text"
              id="score"
              value={score}
              onChange={handleChangeScore}
              className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
            />

            <Icon
              name="save"
              tooltip="save priority"
              theme={`${nightMode ? "dark" : "light"}`}
              size="small"
              className="w-12"
              onClick={handleSendPriority}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Data;
