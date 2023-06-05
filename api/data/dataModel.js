const db = require("../../data/dbconfig");

async function getAllJob() {
  return await db("jobs");
}

async function insertJob(job) {
  await db("jobs").insert(job);
  return await db("jobs");
}

async function updateJob(jobId, job) {
  await db("jobs").where({ jobId }).update(job);
  return await db("jobs");
}

async function getAllSector() {
  return await db("sectors");
}

async function insertSector(sector) {
  await db("sectors").insert(sector);
  return await db("sectors");
}

async function updateSector(sectorId, sector) {
  await db("sectors").where({ sectorId }).update(sector);
  return await db("sectors");
}

async function getAllPriorities() {
  return await db("priorities as p")
    .leftJoin("jobs as j", "p.jobId", "j.jobId")
    .leftJoin("sectors as s", "p.sectorId", "s.sectorId");
}

async function insertPriorities(priority) {
  await db("priorities").insert(priority);
  return await db("priorities as p")
    .leftJoin("jobs as j", "p.jobId", "j.jobId")
    .leftJoin("sectors as s", "p.sectorId", "s.sectorId");
}

async function updatePriorities(priorityId, priority) {
  await db("priorities").where({ priorityId }).update(priority);
  return await db("priorities as p")
    .leftJoin("jobs as j", "p.jobId", "j.jobId")
    .leftJoin("sectors as s", "p.sectorId", "s.sectorId");
}

module.exports = {
  getAllJob,
  getAllSector,
  getAllPriorities,
  insertJob,
  insertSector,
  insertPriorities,
  updateJob,
  updateSector,
  updatePriorities,
};
