const db = require("../../data/dbconfig");

async function getAll() {
  const allData = await db("clients as c").where("status", "in progress");

  return allData;
}

async function getByYear(workStartYear) {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", workStartYear)
    .where("status", "in progress");

  return filterData;
}

async function getByFixYear() {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", 2015)
    .where("status", "in progress");

  return filterData;
}

async function getByGraduate(graduate) {
  const filterData = await db("clients as c")
    .where({ graduate })
    .where("status", "in progress");

  return filterData;
}

async function getByFixGraduate() {
  const filterData = await db("clients as c")
    .where({
      graduate: ["Üniversite"],
    })
    .where("status", "in progress");

  return filterData;
}

async function getTwoCheck(workStartYear, graduate) {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", workStartYear)
    .where({ graduate })
    .where("status", "in progress");
}

async function getSuitable() {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", 2015)
    .where({ graduate: "Üniversite" })
    .where("status", "in progress");

  return filterData;
}

async function insertClient(client) {
  return await db("clients").insert(client);
}

async function getPoints() {
  return await db("priorities")
    .leftJoin("jobs", "priorities.jobId", "jobs.jobId")
    .leftJoin("sectors", "sectors.sectorId", "priorities.sectorId");
}

async function removeClient(clientId) {
  await db("clients").where({ clientId }).del();

  return await db("clients").where("status", "in progress");
}

async function updateClient(clientId, client) {
  await db("clients").where({ clientId }).update(client);

  const liste = await db("clients").where("status", "in progress");

  return liste;
}

async function getCompleted() {
  const allData = await db("clients as c").where("status", "completed");

  return allData;
}

async function getAllClients() {
  const allData = await db("clients as c");

  return allData;
}

module.exports = {
  getAll,
  getByFixGraduate,
  getByFixYear,
  getByGraduate,
  getByYear,
  getSuitable,
  getTwoCheck,
  insertClient,
  getPoints,
  removeClient,
  updateClient,
  getCompleted,
  getAllClients,
};
