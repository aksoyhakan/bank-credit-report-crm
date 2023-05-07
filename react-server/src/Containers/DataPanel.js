import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Client from "./Client";
import Graph from "./Graph";
import { getPointAPI } from "../reducer/actions";

export default function DataPanel() {
  const clients = useSelector((state) => state.clients);
  const token = useSelector((state) => state.token);
  const graphVisible = useSelector((state) => state.graphVisible);
  const completed = useSelector((state) => state.completed);
  const dispatch = useDispatch();
  const nightMode = useSelector((state) => state.nightMode);

  useEffect(() => {
    dispatch(getPointAPI(token));
  }, []);

  return (
    <div
      className={`absolute top-36 w-11/12 ml-16  h-3/4 shadow-2xl rounded-sm z-10 overflow-auto ${
        nightMode ? "bg-slate-700" : "bg-white"
      }`}
    >
      {graphVisible ? (
        <Graph />
      ) : clients.length > 0 ? (
        <div>
          <div className="flex justify-between mx-16 my-4 border-b-4 pb-4">
            <p className={`w-2 ${nightMode ? "text-white" : "text-black"}`}>
              L/N
            </p>
            <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
              Name
            </p>
            <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
              Surname
            </p>
            <p className={`w-16 ${nightMode ? "text-white" : "text-black"}`}>
              Occupation
            </p>
            <p className={`w-20 ${nightMode ? "text-white" : "text-black"}`}>
              Work Start Year
            </p>
            <p className={`w-8 ${nightMode ? "text-white" : "text-black"}`}>
              Graudate
            </p>
            {completed && (
              <p className={`w-8 ${nightMode ? "text-white" : "text-black"}`}>
                Status
              </p>
            )}
            {!completed && (
              <p className={`w-12 ${nightMode ? "text-white" : "text-black"}`}>
                Puan
              </p>
            )}
            {!completed && (
              <p className={`w-20 ${nightMode ? "text-white" : "text-black"}`}>
                Hesaplama
              </p>
            )}
          </div>
          {clients.length > 0 &&
            clients.map((client, index) => (
              <Client line={index + 1} data={client}></Client>
            ))}
        </div>
      ) : (
        <p
          className={`w-50 text-center mt-32 text-4xl ${
            nightMode ? "text-white" : "text-black"
          }`}
        >
          Görüntülenecek sonuç yok
        </p>
      )}
    </div>
  );
}
//Data Grid yapısı
