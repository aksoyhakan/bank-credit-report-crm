/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const clientData = [
  {
    name: "Şabaniye",
    surname: "Taş",
    citizenshipNo: "412345678912",
    sector: "Eğitim",
    occupation: "Öğretmen",
    workStartYear: 2017,
    graduate: "Lise",
  },
  {
    name: "Ziya",
    surname: "Dam",
    citizenshipNo: "258699412211",
    sector: "Kamu",
    occupation: "Yönetici",
    workStartYear: 1995,
    graduate: "Üniversite",
  },
  {
    name: "Abdurrahman",
    surname: "Başgezen",
    citizenshipNo: "4545221554451",
    sector: "Sağlık",
    occupation: "Doktor",
    workStartYear: 1997,
    graduate: "Üniversite",
  },

  {
    name: "Abdurrqd",
    surname: "Başgeqweqwe",
    citizenshipNo: "45452224",
    sector: "Sağlık",
    occupation: "Doktor",
    workStartYear: 1979,
    graduate: "Üniversite",
  },

  {
    name: "Ziyali",
    surname: "Damca",
    citizenshipNo: "2586994122341",
    sector: "Eğitim",
    occupation: "Öğretmen",
    workStartYear: 1995,
    graduate: "Lise",
  },
  {
    name: "Abdurezak",
    surname: "Başgezen",
    citizenshipNo: "4545221554419",
    sector: "Kamu",
    occupation: "Yönetici",
    workStartYear: 1997,
    graduate: "Ortaokul",
  },

  {
    name: "Seloocan",
    surname: "Baş",
    citizenshipNo: "567891232312",
    sector: "Sağlık",
    occupation: "Doktor",
    workStartYear: 2011,
    graduate: "Üniversite",
  },

  {
    name: "Niyazi",
    surname: "Başkeke",
    citizenshipNo: "4545222489",
    sector: "Kamu",
    occupation: "Yönetici",
    workStartYear: 1979,
    graduate: "Ortaokul",
  },
];

exports.clientData = clientData;

exports.seed = async function (knex) {
  return await knex("clients").insert(clientData);
};
