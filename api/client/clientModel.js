const db = require("../../data/dbconfig");

async function getAll() {
  const allData = await db("clients as c");

  return allData;
}

async function getByYear(workStartYear) {
  const filterData = await db("clients as c").where(
    "workStartYear",
    "<",
    workStartYear
  );

  return filterData;
}

async function getByFixYear() {
  const filterData = await db("clients as c").where("workStartYear", "<", 2015);

  return filterData;
}

async function getByGraduate(graduate) {
  const filterData = await db("clients as c").where({ graduate });

  return filterData;
}

async function getByFixGraduate() {
  const filterData = await db("clients as c").where({
    graduate: ["Üniversite"],
  });

  return filterData;
}

async function getTwoCheck(workStartYear, graduate) {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", workStartYear)
    .where({ graduate });
}

async function getSuitable() {
  const filterData = await db("clients as c")
    .where("workStartYear", "<", 2015)
    .where({ graduate: "Üniversite" });

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

  return await db("clients");
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
};
