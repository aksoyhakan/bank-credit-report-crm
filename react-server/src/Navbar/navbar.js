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

  return (
    <div className="w-1/4 h-screen shadow-2xl pl-8 p-4 ">
      <div className="flex flex-col gap-6 mt-7">
        <div className="flex text-3xl items-center gap-6 ">
          <div className="">
            <AiOutlineBank />
          </div>
          <div>INTERBANK</div>
        </div>
        <div
          onClick={handleClickClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div>010</div>
          <div>Tüm Müşteriler</div>
        </div>
        <div
          onClick={handleClickClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div>020</div>
          <div>Eğitime Göre Filtrele</div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="graduate">Eğitim:</label>
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
          <div>030</div>
          <div>Çalışma Başlangicina Göre Filtrele</div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="workStartYear">Başlangıç Tarihi:</label>
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
          <div>040</div>
          <div>Hazır Query</div>
        </div>
        <div
          onClick={handleClickNewClient}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div>050</div>
          <div>Type Form Veri Çek</div>
        </div>
        <div
          onClick={handleClickCompleted}
          className="flex gap-4 border-solid border-2 border-black-900"
        >
          <div>060</div>
          <div>İşlemleri Tamamlanan</div>
        </div>

        {rolename === "süper yönetici" && (
          <div
            onClick={handleClickGraph}
            className="flex gap-4 border-solid border-2 border-black-900"
          >
            <div>070</div>
            <div>Grafikler</div>
          </div>
        )}
      </div>
    </div>
  );
}
