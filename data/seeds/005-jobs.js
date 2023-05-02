/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const jobData = [
  { jobName: "Yönetici" },
  { jobName: "Doktor" },
  { jobName: "Öğretmen" },
];

exports.jobData = jobData;

exports.seed = async function (knex) {
  return await knex("jobs").insert(jobData);
};
