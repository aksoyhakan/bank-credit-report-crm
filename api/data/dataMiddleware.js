const db = require("../../data/dbconfig");

function jobCheckPayload(req, res, next) {
  const { jobName } = req.body;
  jobName ? next() : next({ status: 404, message: "Occupation is missing" });
}

async function jobIdCheck(req, res, next) {
  const { id } = req.params;
  const searchedJob = await db("jobs").where("jobId", id).first();
  searchedJob ? next() : next({ status: 404, message: "Job is not found" });
}

function sectorCheckPayload(req, res, next) {
  const { sectorName } = req.body;
  sectorName ? next() : next({ status: 404, message: "Sector is missing" });
}

async function sectorIdCheck(req, res, next) {
  const { id } = req.params;
  const searchedSector = await db("sectors").where("sectorId", id).first();
  searchedSector
    ? next()
    : next({ status: 404, message: "Sector is not found" });
}

function priorityCheckPayload(req, res, next) {
  const { sectorId, jobId, group, possibility } = req.body;
  sectorId && jobId && group && possibility
    ? next()
    : next({ status: 404, message: "Missing data" });
}

async function priorityIdCheck(req, res, next) {
  const { id } = req.params;
  const searchedPriority = await db("priorities")
    .where("priorityId", id)
    .first();
  searchedPriority
    ? next()
    : next({ status: 404, message: "Priority is not found" });
}

async function priorityCheck(req, res, next) {
  const { sectorId, jobId } = req.body;
  const searchedJob = await db("jobs").where({ jobId }).first();
  !searchedJob && next({ status: 404, message: "Job is not found" });
  const searchedSector = await db("sectors").where({ sectorId }).first();
  !searchedSector && next({ status: 404, message: "Sector is not found" });
  next();
}

module.exports = {
  jobCheckPayload,
  sectorCheckPayload,
  priorityCheckPayload,
  jobIdCheck,
  priorityCheck,
  sectorIdCheck,
  priorityIdCheck,
};
