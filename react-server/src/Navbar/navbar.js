import React, { useState } from "react";
import { AiOutlineBank } from "react-icons/ai";
import {
  getClientAPI,
  getClientAllSuitableAPI,
  getNewClientAPI,
  graphToogle,
  getCompletedClientAPI,
  completedToogle,
  getAllClientAPI,
} from "../reducer/actions";
import { useDispatch, useSelector } from "react-redux";

const dummyQuery = { graduate: "", workStartYear: 0 };

export default function Navbar() {
  const [query, setQuery] = useState(dummyQuery);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const typeformToken = useSelector((state) => state.currentUser.typeformToken);
  const rolename = useSelector((state) => state.currentUser.rolename);
  const nightMode = useSelector((state) => state.nightMode);

  function handleChange(event) {
    setQuery({
      ...query,
      [event.target.name]:
        event.target.name === "workStartYear"
          ? Number(event.target.value)
          : event.target.value,
    });
  }

  function handleClickNewClient() {
    dispatch(getNewClientAPI(typeformToken, token));
    dispatch(graphToogle(false));
    dispatch(completedToogle(false));
    dispatch(getAllClientAPI(token));
  }

  function handleClickClient() {
    console.log(token);
    console.log(query);
    dispatch(getClientAPI(query, token));
    dispatch(graphToogle(false));
    dispatch(completedToogle(false));
    dispatch(getAllClientAPI(token));
    setQuery(dummyQuery);
  }

  function handleClickAllSuitableClient() {
    dispatch(getClientAllSuitableAPI(token));
    dispatch(graphToogle(false));
    dispatch(completedToogle(false));
    dispatch(getAllClientAPI(token));
    setQuery(dummyQuery);
  }

  function handleClickGraph() {
    dispatch(graphToogle(true));
    dispatch(completedToogle(false));
  }

  function handleClickCompleted() {
    dispatch(getCompletedClientAPI(token));
    dispatch(getAllClientAPI(token));
    dispatch(graphToogle(false));
  }
  console.log(nightMode);
  return (
    <div
      className={` w-1/4 h-screen shadow-2xl pl-8 p-4 ${
        nightMode ? "bg-slate-700" : "bg-white"
      }`}
    >
      <div className="flex flex-col gap-6 mt-7">
        <div className="flex text-3xl items-center gap-6 ">
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            <AiOutlineBank />
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            INTERBANK
          </div>
        </div>
        <div
          onClick={handleClickClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            010
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            Tüm Müşteriler
          </div>
        </div>
        <div
          onClick={handleClickClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            020
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            Eğitime Göre Filtrele
          </div>
        </div>
        <div className="flex gap-4">
          <label
            className={`${nightMode ? "text-white" : "text-black"}`}
            htmlFor="graduate"
          >
            Eğitim:
          </label>
          <select onChange={handleChange} name="graduate" id="graduate">
            <option value="İlkokul">İlkokul</option>
            <option value="Ortaokul">Ortaokul</option>
            <option value="Lise">Lise</option>
            <option value="Üniversite">Üniversite</option>
          </select>
        </div>
        <div
          onClick={handleClickClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            030
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            Çalışma Başlangicina Göre Filtrele
          </div>
        </div>
        <div className="flex gap-4">
          <label
            className={`${nightMode ? "text-white" : "text-black"}`}
            htmlFor="workStartYear"
          >
            Başlangıç Tarihi:
          </label>
          <input
            className="border-solid border-2 border-black-900"
            type="number"
            name="workStartYear"
            id="workStartYear"
            value={query.workStartYear}
            onChange={handleChange}
          />
        </div>

        <div
          onClick={handleClickAllSuitableClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            040
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            Hazır Query
          </div>
        </div>
        <div
          onClick={handleClickNewClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            050
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            Type Form Veri Çek
          </div>
        </div>
        <div
          onClick={handleClickCompleted}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            060
          </div>
          <div className={`${nightMode ? "text-white" : "text-black"}`}>
            İşlemleri Tamamlanan
          </div>
        </div>

        {rolename === "süper yönetici" && (
          <div
            onClick={handleClickGraph}
            className="flex gap-4 border-solid border-2 border-black-900"
          >
            <div className={`${nightMode ? "text-white" : "text-black"}`}>
              070
            </div>
            <div className={`${nightMode ? "text-white" : "text-black"}`}>
              Grafikler
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
