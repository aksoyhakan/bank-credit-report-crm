import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Client from "./Client";
import Graph from "./Graph";
import { getPointAPI } from "../reducer/actions";

export default function DataPanel() {
  const clients = useSelector((state) => state.clients);
  const token = useSelector((state) => state.token);
  const graphVisible = useSelector((state) => state.graphVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPointAPI(token));
  }, []);

  return (
    <div className="absolute top-36 w-11/12 ml-16  h-3/4 shadow-2xl rounded-sm z-10 bg-white">
      {graphVisible ? (
        <Graph />
      ) : clients.length > 0 ? (
        <div>
          <div className="flex justify-between mx-16 my-4">
            <p className="w-2">L/N</p>
            <p className="w-16">Name</p>
            <p className="w-16">Surname</p>
            <p className="w-32">Citizenship No</p>
            <p className="w-16">Occupation</p>
            <p className="w-20">Work Start Year</p>
            <p className="w-8">Graudate</p>
            <p className="w-4">Puan</p>
            <p className="w-8">Hesaplama</p>
          </div>
          {clients.length > 0 &&
            clients.map((client, index) => (
              <Client line={index + 1} data={client}></Client>
            ))}
        </div>
      ) : (
        <p>Görüntülenecek sonuç yok</p>
      )}
    </div>
  );
}
//Data Grid yapısı
