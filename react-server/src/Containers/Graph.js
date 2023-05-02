import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";

function Graph() {
  const clients = useSelector((state) => state.clients);
  let graudateQuantity = { İlkokul: 0, Ortaokul: 0, Lise: 0, Üniversite: 0 };
  let sectorQuantity = { Sağlık: 0, Kamu: 0, Eğitim: 0 };
  let occupationQuantity = { Yönetici: 0, Doktor: 0, Öğretmen: 0 };

  clients.forEach((client) => {
    graudateQuantity[client.graduate] = graudateQuantity[client.graduate] + 1;
    sectorQuantity[client.sector] = sectorQuantity[client.sector] + 1;
    occupationQuantity[client.occupation] =
      occupationQuantity[client.occupation] + 1;
  });
  const graduate = [
    { name: "İlkokul", clients: graudateQuantity["İlkokul"] },
    { name: "Ortaokul", clients: graudateQuantity["Ortaokul"] },
    { name: "Lise", clients: graudateQuantity["Lise"] },
    { name: "Üniversite", clients: graudateQuantity["Üniversite"] },
  ];

  const sector = [
    { name: "Sağlık", clients: sectorQuantity["Sağlık"] },
    { name: "Kamu", clients: sectorQuantity["Kamu"] },
    { name: "Eğitim", clients: sectorQuantity["Eğitim"] },
  ];

  const occupation = [
    { name: "Yönetici", clients: occupationQuantity["Yönetici"] },
    { name: "Doktor", clients: occupationQuantity["Doktor"] },
    { name: "Öğretmen", clients: occupationQuantity["Öğretmen"] },
  ];
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-16">Metrik Ölçütler</h1>

      <div className="flex justify-around align-middle mt-8">
        <div className="text-center">
          <h2 className="font-bold">Eğitim Durumuna Göre</h2>
          <BarChart
            className="mx-auto"
            width={300}
            height={300}
            data={graduate}
          >
            <Bar dataKey="clients" fill="green" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
        <div className="text-center">
          <h2 className="font-bold">Sektör Durumuna Göre</h2>
          <BarChart className="mx-auto" width={300} height={300} data={sector}>
            <Bar dataKey="clients" fill="blue" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
        <div className="text-center">
          <h2 className="font-bold">Meslek Durumuna Göre</h2>
          <BarChart
            className="mx-auto"
            width={300}
            height={300}
            data={occupation}
          >
            <Bar dataKey="clients" fill="red" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Graph;