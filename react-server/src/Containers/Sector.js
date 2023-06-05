import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import { modifySector, updateSectorAPI } from "../reducer/actions";

function Sector(props) {
  const dispatch = useDispatch();

  const { sectorId, sectorName } = props.data;
  const nightMode = useSelector((state) => state.nightMode);
  const modifyIndex = useSelector((state) => state.modifySector);
  const token = useSelector((state) => state.token);
  const [sector, setSector] = useState(sectorName);

  function handleChange(e) {
    setSector(e.target.value);
  }

  function handleEdit() {
    if (modifyIndex === sectorId) {
      dispatch(modifySector(0));
    } else {
      dispatch(modifySector(sectorId));
    }
  }

  function handleUpdateSector() {
    dispatch(updateSectorAPI(token, sectorId, { sectorName: sector }));
    dispatch(modifySector(0));
  }

  return (
    <div
      className={`w-72 mx-auto my-4 border-b-4 overflow-hidden transition-all duration-500 ${
        modifyIndex === sectorId ? "h-36" : "h-12"
      }`}
    >
      <div className="flex justify-between pb-2">
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {sectorId}
        </p>
        <p
          className={`w-24 ${
            nightMode ? "text-white" : "text-black"
          } text-center`}
        >
          {sectorName}
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
        <input
          type="text"
          id="sectorName"
          value={sector}
          onChange={handleChange}
          className="w-24 block py-0 border-solid border-2 border-black-900 px-2"
        />
        <Icon
          name="upload"
          tooltip="modify sector"
          theme={`${nightMode ? "dark" : "light"}`}
          size="small"
          className="w-12"
          onClick={handleUpdateSector}
        />
      </div>
    </div>
  );
}

export default Sector;
